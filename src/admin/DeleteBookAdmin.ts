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
        const book = await Libros.findByPk(id);
        if(!book){
            return res.status(404).send('Libro no encontrado')
        }
        await Libros.destroy({ where: { id } });
        await LibrosGeneros.destroy({ where: { libroid: id } });
        return res.json('Libro eliminado');
    } catch (err) {
        next(err);
    }
};