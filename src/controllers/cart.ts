import { NextFunction, Request, Response } from "express";
import { Carrito } from "../models/Carrito";
import { CarritoLibros } from "../models/CarritoLibros";

export const addToCart = async(req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;
    try{
        const carrito = await Carrito.findOne({where:{userid: user_id}});

        if(carrito){
            await CarritoLibros.create({libro_id: req.body.id, carrito_id: carrito.id})

            return res.send("El libro fue agregado")
        }
        return res.json("no se encontro el carrito")
    }catch(err){
        next(err)
    }
    
    
}