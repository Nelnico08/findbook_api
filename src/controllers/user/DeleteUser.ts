import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';
import { sendEmail } from '../../utils/email';
import { deleteAccount } from '../../utils/messages';
import { Libros } from '../../models/Libros';
import { Carrito } from '../../models/Carrito';
import { CarritoLibros } from '../../models/CarritoLibros';
import { FavoritosLibros } from '../../models/FavoritosLibros';

const bcrypt = require('bcrypt');

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userid = req.user_id;
        const user = await Usuario.findByPk(userid);
        const {password} = req.body;
        const subject = "Eliminacion de cuenta"
        
        if(!user){
            return res.json({error: 'Usuario inexistente'});
        }
        const comparePass = await bcrypt.compare(password,user.password)
        if(!comparePass){
            return res.json({error: "La constraseña es incorrecta"});
        }
        await user.update({
            status: 'deleted'
        })
        const carrito = await Carrito.findOne({where: {userid:user.id}})
        const libros = await Libros.findAll({where:{User_id: user.id}})
        await Libros.update({statusBook: 'false'},{where:{User_id: user.id}})
        await CarritoLibros.destroy({where:{carrito_id:carrito?.id}})
        await Promise.all(libros.map(b=> CarritoLibros.destroy({where:{libro_id:b.id}})))
        await Promise.all(libros.map(bk=>FavoritosLibros.destroy({ where: { libro_id: bk.id } })))
        const message= deleteAccount.replace("{EMAIL}", `${user.email}`)
        sendEmail(user.email, user.name, message, subject)

        return res.json('La cuenta ha sido eliminada correctamente')
    } catch (error) {
        return res.json({error: 'Ha ocurrido un error, intentelo mas tarde'});
    }
}