import { Request, Response, NextFunction } from "express";

export const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{
    return res.send('Aqui no llega')
}