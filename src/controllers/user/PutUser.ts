import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';
const bcrypt = require('bcrypt');

export const putUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.params
        const { name, surname, username, password, emailput, status } = req.body

        if (name) await Usuario.update({ name: name }, { where: { email: email } })
        if (surname) await Usuario.update({ lastname: surname }, { where: { email: email } })
        if (username) await Usuario.update({ username: username }, { where: { email: email } })
        if (emailput) await Usuario.update({email: emailput},{where:{email:email}})
        if (password){
            const newpassword = await bcrypt.hash(
                password,
                Number(process.env.SALT_ROUNDS)
            )
            await Usuario.update({password: newpassword},{where:{email:email}})
        } 
        if (status) await Usuario.update({status: status},{where:{email:email}})

        res.json('Usuario Modificado Correctamente')
    } catch (err) {
        next(err);
    }
}