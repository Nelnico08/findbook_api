import { NextFunction, Request, Response } from 'express';
import { CarritoLibros } from '../../models/CarritoLibros';
import { Libros } from '../../models/Libros';
import { FavoritosLibros } from "../../models/FavoritosLibros";

export const deleteBookAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const book = await Libros.findByPk(id);
        if(!book){
            return res.send('Libro no encontrado')
        }
        await Libros.update({statusBook:'false'},{ where: { id } });
        await CarritoLibros.destroy({ where: { libro_id: book.id } })
        await FavoritosLibros.destroy({ where: { libro_id: book.id } })
        return res.json('Libro eliminado');
    } catch (err) {
        next(err);
    }
};