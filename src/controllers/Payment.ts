import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
import { Libros } from '../models/Libros';
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
      const data = req.body.data
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
          cancel_url: `${process.env.APP_URL}/payment`,
        })
        return res.json({ url: session.url})
      }
      res.json({error: "No se envio data"})
        
    } catch (error) {
        next(error);
    }
  };

  export const getSessionId = async(req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("este es el console log: ", req.query.session_id)
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
      // const customer = await stripe.customers.retrieve(session.customer);

      res.send(`Gracias por su compra`)
    } catch (error) {
      next(error)
    }
  }
