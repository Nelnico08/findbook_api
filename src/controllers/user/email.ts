const Mailjet = require('node-mailjet');
import dotenv from 'dotenv'
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
                    Name: "Nuria"
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
}