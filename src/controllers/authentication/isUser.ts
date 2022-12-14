import { Request, Response, NextFunction } from "express";
import { Usuario } from "../../models/Usuario";

export const isUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = await Usuario.findByPk(req.user_id)
        if(user && user.status === 'true'){
            return res.json({role:user.role})
        }else{
            return res.json({role:'invalid'})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Intentelo mas tarde")
    }
}