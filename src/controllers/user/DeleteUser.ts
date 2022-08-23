import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';
import { sendEmail } from '../../utils/email';
import { deleteAccount } from '../../utils/messages';

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
        const message= deleteAccount.replace("{EMAIL}", `${user.email}`)
        sendEmail(user.email, user.name, message, subject)

        return res.json('La cuenta ha sido eliminada correctamente')
    } catch (error) {
        return res.json({error: 'Ha ocurrido un error, intentelo mas tarde'});
    }
}