import { NextFunction, Request, Response } from 'express'
import { Usuario } from '../../models/Usuario';


export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user_id = req.user_id;
        const user = await Usuario.findOne({where:{id: user_id}})
        if(user){
            return res.json(user)
        }
        else{
            return res.json({error:'Usuario no encontrado'});            
        }
    } catch (error) {
        next(error);
    }
}