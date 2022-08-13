import { NextFunction, Request, Response } from "express";
import { Carrito } from "../models/Carrito";
import { CarritoLibros } from "../models/CarritoLibros";

export const addToCart = async(req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;
    const book_id = req.body.id;
    try{
        const carrito = await Carrito.findOne({where:{userid: user_id}});

        if(carrito){
            const bookFound = await CarritoLibros.findOne({where:{libro_id:book_id}})
            if(bookFound) return res.json({message: "El libro ya se encuentra en el carrito"})
            await CarritoLibros.create({libro_id: book_id, carrito_id: carrito.id})

            return res.json({message: "El libro fue agregado"})
        }
        return res.json({message: "no se encontro el carrito"})
    }catch(err){
        next(err)
    }
    
    
}