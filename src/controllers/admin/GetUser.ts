import { NextFunction, Request, Response } from 'express'
import { Usuario } from '../../models/Usuario';


export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const username = req.params.username;
        const user = await Usuario.findOne({where:{username:username}})
        if(user){
            return res.json({
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                url: user.url,
                status: user.status
            })
        }
        else{
            return res.json({error:'Usuario no encontrado'});            
        }
    } catch (error) {
        next(error);
    }
}