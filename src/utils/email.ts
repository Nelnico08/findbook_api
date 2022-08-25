const Mailjet = require('node-mailjet');
import dotenv from 'dotenv'
dotenv.config
let { MJ_APIKEY_PUBLIC } = process.env
let { MJ_APIKEY_PRIVATE }= process.env

const mailjet = Mailjet.apiConnect(
    MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE
);

export let sendEmail = async (email: string, name:string, message: string, subject: string)=> {
    await mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                    Email: "customerfindbook@gmail.com",
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
};