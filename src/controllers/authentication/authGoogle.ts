import { Request, Response, NextFunction } from "express";
import { Usuario } from "../../models/Usuario";
import { Carrito } from '../../models/Carrito';
import dotenv from 'dotenv';
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const google =async (req:Request, res:Response, next:NextFunction) => {
    try{
        if(!req.body.email_verified){
            return res.json({error: "Ocurrio un error al intentar verificar tu email con Google"})
        }
        const user =  await Usuario.findOne({ where: { email: req.body.email } });
        if(user){
            if(user.status === 'false'){
                return res.json({error: "ESTE USUARIO ESTA BLOQUEADO - Comunicate con el ADMIN"})
            }
            const token = jwt.sign({user_id:user.id}, process.env.JWT_SECRET)
            return res.json({token})
        }else{
            const email = req.body.email;
            const password = req.body.email.split("").reverse().join("");
            const username = req.body.email;
            const name = req.body.given_name.includes(" ")?req.body.given_name.split(" ")[0]:req.body.given_name;
            const lastname = req.body.family_name?req.body.family_name.includes(" ")?req.body.family_name.split(" ")[0]:req.body.family_name:' ';
            const url = `https://ui-avatars.com/api/?name=${name}+${lastname}?background=F0EDE5`;
            const hashedPass = await bcrypt.hash(
                password,
                Number(process.env.SALT_ROUNDS)
            )
            const newUser = await Usuario.create({
                email,
                password: hashedPass,
                username,
                name,
                lastname,
                url,
                role: 'user',
                status: 'true'
            })
            await Carrito.create({
                userid:newUser.id
            });
            req.body.email = email;
            req.body.password = password;
            next();
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Ocurrio un error, intentalo mas tarde"})
    }
}