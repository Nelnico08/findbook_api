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
            //const books = await Libros.findAll({where: { userid: user_id }}) 
            //return res.json(books)
        }else{
            //const books = await Libros.findAll({where: { userid: 1 }}) 
            //return res.json(books)
        }
    } catch (err) {
        next(err);
    }
}