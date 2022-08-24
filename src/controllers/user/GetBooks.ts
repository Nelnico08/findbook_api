import { NextFunction, Request, Response } from 'express';
import { Libros } from '../../models/Libros';
import { Usuario } from '../../models/Usuario';

export const getBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user_id = req.user_id;
    try {
        const typeUser = await Usuario.findByPk(user_id)
        if(typeUser?.role === 'user'){
            const books = await Libros.findAll({where: { User_id: user_id, statusBook: 'true'}}) 
            return res.json(books)
        }else if(typeUser?.role === 'admin'){
            const books = await Libros.findAll({where: { User_id: 1, statusBook: 'true'}}) 
            return res.json(books)
        }
    } catch (err) {
        next(err);
    }
}

export const getBookDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user_id = req.user_id;
    const bookId = req.params.id
    try {
        let books;
        const typeUser = await Usuario.findByPk(user_id)
        if(typeUser?.role === 'user'){
            books = await Libros.findOne({where: { User_id: user_id, id: bookId}}) 
        }else if(typeUser?.role === 'admin'){
            books = await Libros.findOne({where: { User_id: 1, id: bookId}}) 
        }
        return res.json(books?books:{error:'El usuario no tiene ese libro'})
    } catch (err) {
        return res.json({error:'El usuario no tiene ese libro'})
    }
}
