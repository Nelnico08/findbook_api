import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../../models/Usuario';
import { sendEmail } from '../../utils/email';
import { banAccont, permaBanAccont } from '../../utils/messages';

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
        if(status === 'false'){
            if(user){
                const subject= "Cuenta suspendida";
                const message= banAccont.replace("{EMAIL}", `${user.email}`);
                sendEmail(user.email, user.name, message, subject)
            }
        }
        if(status === 'deleted'){
            if(user){
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