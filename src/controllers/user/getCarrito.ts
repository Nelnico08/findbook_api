import { NextFunction, Request, Response } from "express";
import { Carrito } from "../../models/Carrito";
import { Libros } from "../../models/Libros";

export const getCarrito = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const carrito = await Carrito.findOne({
            where:{
                userid:req.user_id
            },
            include:{
                model:Libros
            }
        })
        if(carrito){
            return res.json({books:carrito.Libros});
        }
        return res.status(404).json({role: 'invalid'})
    } catch (error) {
        console.log(error);
        next(error)
    }
}