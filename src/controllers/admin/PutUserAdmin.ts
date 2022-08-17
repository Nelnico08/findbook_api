import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';

export const putUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.params
        const { status } = req.body

        if (status) await Usuario.update({status: status},{where:{email:email}})
        res.json('Usuario Modificado Correctamente')
    } catch (err) {
        next(err);
    }
}