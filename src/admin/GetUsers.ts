import { NextFunction, Request, Response } from 'express'
import { Op } from 'sequelize';
import { Usuario } from '../models/Usuario';

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.query
        let users;
        if (name) {
            users = await Usuario.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
            });
        } else {
            users = await Usuario.findAll()
        }
        return res.json(
            users ? users : { message: 'No hay libros' }
        )
    } catch (error) {
        next(error);
    }
}