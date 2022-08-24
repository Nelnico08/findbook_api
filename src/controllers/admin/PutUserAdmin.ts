import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';
import { sendEmail } from '../../utils/email';
import { banAccont, permaBanAccont } from '../../utils/messages';
import { Libros } from '../../models/Libros';
import { CarritoLibros } from '../../models/CarritoLibros';
import { Carrito } from '../../models/Carrito';

export const putUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.params
        const { status } = req.body

        if (status) await Usuario.update({status: status},{where:{email:email}})
        const user = await Usuario.findOne({where:{email}});
        if(status === 'true'){
            if(user){
                await Libros.update({
                    statusBook: 'true' 
                },
                {
                    where:{
                        User_id: user.id
                    }
                })
            }
        }
        if(status === 'false'){
            if(user){
                const carrito = await Carrito.findOne({where: {userid:user.id}})
                const libros = await Libros.findAll({where:{User_id: user.id}})
                await Libros.update({statusBook: 'false'},{where:{User_id: user.id}})
                await CarritoLibros.destroy({where:{carrito_id:carrito?.id}})
                await Promise.all(libros.map(b=> CarritoLibros.destroy({where:{libro_id:b.id}})))
                const subject= "Cuenta suspendida";
                const message= banAccont.replace("{EMAIL}", `${user.email}`);
                sendEmail(user.email, user.name, message, subject)
            }
        }
        if(status === 'deleted'){
            if(user){
                const carrito = await Carrito.findOne({where: {userid:user.id}})
                const libros = await Libros.findAll({where:{User_id: user.id}})
                await Libros.update({statusBook: 'false'},{where:{User_id: user.id}})
                await CarritoLibros.destroy({where:{carrito_id:carrito?.id}})
                await Promise.all(libros.map(b=> CarritoLibros.destroy({where:{libro_id:b.id}})))
                const subject= "Cuenta suspendida permanentemente";
                const message= permaBanAccont.replace("{EMAIL}", `${user.email}`);
                sendEmail(user.email, user.name, message, subject)
            }
        }
        res.json('Usuario Modificado Correctamente')
    } catch (err) {
        next(err);
    }
}