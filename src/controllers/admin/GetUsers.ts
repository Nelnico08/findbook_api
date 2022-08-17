import { NextFunction, Request, Response } from 'express'
import { Op } from 'sequelize';
import { Usuario } from '../../models/Usuario';

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
                    role:'user'
                },
            });
        } else {
            users = await Usuario.findAll({
                where:{
                    role:'user'
                }
            })
        }

        users = users.map(user=>{
            return {
                email: user.email,
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                url: user.url,
                status: user.status
            }
        })

        return res.json(
            users.length ? {users} : { message: 'No hay usuarios' }
        )
    } catch (error) {
        next(error);
    }
}