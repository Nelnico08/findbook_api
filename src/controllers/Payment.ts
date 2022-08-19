import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Libros } from '../models/Libros';
import { Carrito } from '../models/Carrito';
import { CarritoLibros } from '../models/CarritoLibros';
import { Usuario } from '../models/Usuario';
import { Compras } from '../models/Compras';
import { Items } from '../models/Items';
dotenv.config()

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_KEY);



export const paymentInt = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {

    try {
      const user_id = req.user_id;
      const data = req.body.data
      let email: string | undefined = undefined;
      let date = Math.round(Date.now() / 1000)

      const user = await Usuario.findByPk(user_id);
      if(user){
        email = user.email
      }
      //busco los libros que pasan por body y devuelvo un array con id y precio
      let books = data.map(async(item: any) =>{
        const book = await Libros.findOne({
          where:{id:item.id},
        })
        if(book){
          return{
            id: book.id,
            name: book.name,
            price: book.price,
            quantity: item.quantity
          }
        }
      })
      const promiseBooks = await Promise.all(books)

      if(promiseBooks.length){
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: promiseBooks.map((book:any) => {
            return{
              price_data:{
                currency: "usd",
                product_data: {
                  name: book.name
                },
                unit_amount: book.price * 100
              },
              quantity: book.quantity,
            }
          }),
          success_url: `${process.env.APP_URL}/payment/success/{CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.APP_URL}/payment?cancel_session={CHECKOUT_SESSION_ID}`,
          customer_email: email,
          expires_at: date + 1800
        })

        if(session.status === "open"){
          const checkStatus = await Compras.findOne({where:{user_id, status:"open"}})

          if(checkStatus){
            await Compras.update({status: "expired"}, {where:{id: checkStatus.id}})
          }
          //Busco o creo la lista de compra para el usuario, solo si status es "open"
          await Compras.findOrCreate({
            where:{id: session.id},
            defaults:{
              id: session.id,
              user_id: user_id,
              totalPrice: session.amount_total/100,
              status: "open",
              buttonSwitch: "disable"
            }
          })
          //Por cada item en data, busco o creo un item relacionado con la lista de compra
          promiseBooks.forEach(async(book: any) => {
            const foundItem = await Items.findOne({
              where:{
                compras_id: session.id,
                libro_id: book.id,
              }
            })
            if(foundItem){
              await Items.update({
                quantity: book.quantity,
                subTotal: book.quantity * book.price
              },
              {where:{
                compras_id: session.id,
                libro_id: book.id,
              }})
            }else{
              await Items.create({
                compras_id: session.id,
                libro_id: book.id,
                quantity: book.quantity,
                subTotal: book.quantity * book.price
              })
            }
          })
        }
        async function asyncGenerator(ms:number){
          await new Promise((resolve) => setTimeout(resolve,ms))
        }
        async function statusCheck(){
          await asyncGenerator(1800000);
          const statusCheck = await Compras.findOne({
            where:{
              id:session.id,
              status: "open"
            }})
          if(statusCheck){
            await Compras.update({status:"expired", buttonSwitch: "active"},{where:{id:session.id}})
          }else{
            const button = await Compras.findOne({where:{id: session.id, buttonSwitch: "disable"}});
            if(button){
              await Compras.update({buttonSwitch: "active"}, {where:{id:session.id}})
            }
          }
        }
        statusCheck();
        return res.json({ url: session.url })
      }
      res.json({error: "No se envio data"})
        
    } catch (error) {
        next(error);
    }
  };

  export const getSessionId = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user_id;
      const session_id = req.query.session_id
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if(session){
        if(session.status === "complete"){
          //vaciar carrito
          const cartUser = await Carrito.findOne({where:{userid: user_id}})
          if(cartUser){
            await CarritoLibros.destroy({where:{carrito_id: cartUser.userid}})
          }
          //busco la lista de compra del usuario y cambio su estado a complete
          const userOrder = await Compras.findByPk(session.id);
          if(userOrder){
            await Compras.update({status:"complete"},{where:{id:session.id}})
          }
          return res.send(`Gracias por su compra`)
        }
        else if(session.status === "open"){
          const cancelSession = await stripe.checkout.sessions.expire(req.query.session_id)
          await Compras.update({status:"expired"}, {where:{id:session.id}})
          if(cancelSession){
            return res.send('El pago no ha sido realizado')
          }
        }
      }else{
        return res.json({message: "session no encontrada"})
      }
    } catch (error) {
      next(error)
    }
  }

  export const buttonSwitch = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user_id;

      const buttonStatus = await Compras.findOne({where:{user_id:user_id, buttonSwitch: "disable"}});
      if(buttonStatus){
        return res.send("boton deshabilitado")
      }else{
        return res.send("boton habilitado")
      }
    } catch (error) {
      next(error)
    }
  }
