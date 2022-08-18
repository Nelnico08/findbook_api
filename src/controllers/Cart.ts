import { NextFunction, Request, Response } from "express";
import { Carrito } from "../models/Carrito";
import { CarritoLibros } from "../models/CarritoLibros";
import { Libros } from "../models/Libros";

export const addToCart = async(req: Request, res: Response, next: NextFunction) => {
  const user_id = req.user_id;
  const book_id = req.body.id;
  try{
    const cart = await Carrito.findOne({where:{userid: user_id}});

    if(cart){
      const bookFound = await CarritoLibros.findOne({where:{libro_id:book_id,carrito_id:cart.id}})
      if(bookFound) return res.json({message: "El libro ya se encuentra en el carrito"})
      await CarritoLibros.create({libro_id: book_id, carrito_id: cart.id})

      return res.json({message: "El libro fue agregado"})
    }
    return res.json({message: "No se encontro el carrito"})

  }catch(err){
    next(err)
  }
}

export const getUserCart = async(req: Request, res: Response, next: NextFunction) => {
  const user_id = req.user_id;
  try {
    const userCart = await Carrito.findOne(
      {
        where:{
          userid: user_id
        },
        include:{
          model: Libros,
          attributes: ['id', 'name', 'price', 'image', "author", "language"],
          through: {
            attributes: [],
          }
        }
      }
    )
    if(userCart){
      if(userCart.Libros.length){
        return res.json(userCart)
      }
      return res.json({message: "El carrito esta vacio"})
    }
    return res.json({message: "No se encontro el carrito"})

  } catch (error) {
    next(error)
  }
}

export const removeToCart = async(req: Request, res: Response, next: NextFunction) => {
  const user_id = req.user_id;
  const book_id = req.body.id;
  try{
    const cart = await Carrito.findOne({where:{userid: user_id}});

    if(cart){
      const bookFound = await CarritoLibros.findOne({where:{libro_id:book_id,carrito_id:cart.id}})
      if(bookFound) {
        await bookFound.destroy();
        return res.json({message: "El libro fue removido del carrito"})
      }
      return res.json({message: "El libro no se encuentra en el carrito"})
    }
    return res.json({message: "No se encontro el carrito"})
  }catch(err){
    next(err)
  }
}

export const removeAllBooks = async(req:Request, res:Response, next:NextFunction) =>{
  const user_id = req.user_id;

  try {
    const cart = await Carrito.findOne({where:{userid: user_id}});

    if(cart){
      await CarritoLibros.destroy({where:{carrito_id: cart.id}});
      return res.json({message: "El carrito ha sido vaciado"})
    }
    return res.json({message: "No se encontro el carrito"})
  } catch (error) {
    next(error)
  }
}