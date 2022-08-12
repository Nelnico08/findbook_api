import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export const deleteUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        await Usuario.destroy({ where: { id } });
        res.json('Usuario Eliminado');
    } catch (err) {
        next(err);
    }
};