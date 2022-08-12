import { NextFunction, Request, Response } from 'express'
import { Op } from 'sequelize';
import { Usuario } from '../models/Usuario';
import dotenv from 'dotenv';

const jwt = require('jsonwebtoken');
dotenv.config();

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
                token: jwt.sign({user_id:user.id}, process.env.JWT_SECRET),
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                url: user.url,
            }
        })

        return res.json(
            users.length ? users : { message: 'No hay usuarios' }
        )
    } catch (error) {
        next(error);
    }
}