import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import {Usuario} from '../../models/Usuario';
import {Carrito} from '../../models/Carrito';
import {iUsuario} from '../../types/Usuario';
import { Favoritos } from '../../models/Favoritos';
import { sendEmail } from '../../utils/email';
import { register } from '../../utils/messages';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


dotenv.config()

export const registerUser = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const userBody = req.body as iUsuario;
        const subject = "Usuario registrado"
        if(
            userBody.email && 
            userBody.password && 
            userBody.name && 
            userBody.lastname &&
            userBody.username &&
            userBody.url){
            const user = await Usuario.findOne({where:{email: userBody.email}})
            const usernameUser = await Usuario.findOne({where:{username:userBody.username}})
            if(user){
                return res.json({error: 'El Email ya existe'});
            }
            if(usernameUser){
                return res.json({error: 'El Username ya existe'});    
            }
            const hashedPass = await bcrypt.hash(
                userBody.password,
                Number(process.env.SALT_ROUNDS)
            )

            const newUser = await Usuario.create({
                name: userBody.name,
                lastname: userBody.lastname,
                email: userBody.email,
                password: hashedPass,
                username: userBody.username,
                url: userBody.url,
                role: userBody.role,
                status:userBody.status
            }) 
            await Carrito.create({
                    userid:newUser.id
            });
            await Favoritos.create({
                userid:newUser.id
            });
            //envio de email
            sendEmail(userBody.email, userBody.name, register, subject)

            return res.json("Usuario creado existosamente")
        }else{
            return res.json({error: 'Todos los campos son requeridos'})
        }
    }
    catch(error){
        console.log(error)
        return res.status(505).send('Ha ocurrido un problema, intentelo mas tarde')
    }
}

export const loginUser = async (req:Request, res: Response, next:NextFunction)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({error:"Email y contraseña son requeridos."})
        }
        const user = await Usuario.findOne({where:{email}})
        if(!user){
            return res.json({error: "¡No te encuentras registrado!. CREA UNA CUENTA",});
        }
        const comparePass = await bcrypt.compare(password,user.password);
        if(!comparePass){
            return res.json({error: "Email o contraseña incorrectos.",});
        }
        if(user.status === 'false'){
            return res.json({error: "ESTE USUARIO ESTA BLOQUEADO - Comunicate con el ADMIN"})
        }
        if(user.status === 'deleted'){
            return res.json({error: "ESTA CUENTA HA SIDO ELIMINADA"})
        }
        const token = jwt.sign({user_id:user.id}, process.env.JWT_SECRET)
        return res.json({token})
        
    } catch (error) {
        console.log(error)
        return res.status(505).send('Ha ocurrido un problema, intentelo mas tarde')
    }
}