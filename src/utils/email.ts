const Mailjet = require('node-mailjet');
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
dotenv.config
let { MJ_APIKEY_PUBLIC } = process.env
let { MJ_APIKEY_PRIVATE }= process.env

const mailjet = Mailjet.apiConnect(
    MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE
);

export let sendEmail = (email: string, name:string, message: string, subject: string)=> {
    const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                {
                    From: {
                    Email: "customerfindbooks@gmail.com",
                    Name: "Findbook"
                },
                To: [
                    {
                        Email: email,
                        Name: name
                    }
                ],
                Subject: subject,
                TextPart: "Find Book",
                HTMLPart: message,
            }
            ]
            })
    
    request
        .then((result:any) => {
            console.log(result.body)
        })
        .catch((err:any) => {
            console.log(err.message)
        })
};

export const forEmail = async(req:Request, res:Response, next: NextFunction) => {
    const user_id = req.user_id;
    const subject = req.body.params;
    let message: string | undefined = undefined;

    try {
        const user = await Usuario.findByPk(user_id);

        if(user){
            if(subject === "pago"){
                message= "Su pago ha sido aceptado"
                sendEmail(user.email, user.name, message, subject)
                return res.send("mensage enviado")
            }
        }else{
            return res.send("no se encontro al usuario")
        }
    } catch (error) {
        next(error)
    }
}