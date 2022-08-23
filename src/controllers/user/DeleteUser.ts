import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userid = req.user_id;
        const user = await Usuario.findByPk(userid);
        if(!user){
            return res.json({error: 'Usuario inexistente'});
        }
        await user.update({
            status: 'deleted'   
        });
        return res.json('La cuenta ha sido eliminada correctamente')
    } catch (error) {
        return res.json({error: 'Ha ocurrido un error, intentelo mas tarde'});
    }
    

}