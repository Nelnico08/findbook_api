import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';

export const putUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const { name, lastname, username } = req.body

        if (name) await Usuario.update({ name: name }, { where: { id: id } })
        if (lastname) await Usuario.update({ lastname: lastname }, { where: { id: id } })
        if (username) await Usuario.update({ username: username }, { where: { id: id } })
        res.json('Usuario Modificado Correctamente')
    } catch (err) {
        next(err);
    }
}