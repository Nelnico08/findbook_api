import { NextFunction, Request, Response } from 'express';
import { Libros } from '../models/Libros';
import { LibrosGeneros } from '../models/LibrosGeneros';

export const deleteBookAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        await Libros.destroy({ where: { id } });
        await LibrosGeneros.destroy({ where: { libroid: id } });
        res.json('Libro eliminado');
    } catch (err) {
        next(err);
    }
};