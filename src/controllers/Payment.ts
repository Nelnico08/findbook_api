import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
import { Libros } from '../models/Libros';
import { Carrito } from '../models/Carrito';
import { CarritoLibros } from '../models/CarritoLibros';
import { Usuario } from '../models/Usuario';
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
            price: book.price
          }
        }
      })
      const promiseBooks = await Promise.all(books)

      if(promiseBooks.length){
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: promiseBooks.map((book:any, index: number) => {
            return{
              price_data:{
                currency: "usd",
                product_data: {
                  name: book.name
                },
                unit_amount: book.price * 100
              },
              quantity: data[index].quantity,
            }
          }),
          success_url: `${process.env.APP_URL}/payment/success/{CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.APP_URL}/payment?cancel_session={CHECKOUT_SESSION_ID}`,
          customer_email: email
        })
        return res.json({ url: session.url, orderList: data})
      }
      res.json({error: "No se envio data"})
        
    } catch (error) {
        next(error);
    }
  };

  export const getSessionId = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user_id;
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

      if(session){
        if(session.status === "complete"){
          //vaciar carrito
          const cartUser = await Carrito.findOne({where:{userid: user_id}})
          if(cartUser){
            await CarritoLibros.destroy({where:{carrito_id: cartUser.userid}})
          }
          return res.send(`Gracias por su compra`)
        }else if(session.status === "open"){
          const cancelSession = await stripe.checkout.sessions.expire(req.query.session_id)
          if(cancelSession){
            return res.send('El pago no ha sido realizado')
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }
