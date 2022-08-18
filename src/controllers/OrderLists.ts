import { NextFunction, Request, Response } from 'express';
import { Compras } from '../models/Compras';
import { Items } from '../models/Items';
import { Usuario } from '../models/Usuario';

export const getUserOrders = async(req:Request, res:Response, next: NextFunction) => {
    const user_id = req.user_id;

    const user = await Usuario.findByPk(user_id);

    if(user && user.role === "admin"){
        //...el admin debe poder tener acceso a todas las lista de compras
        const findbookUser = Number(req.query.user_id);
        
        if(findbookUser){
            const userFound = await Usuario.findByPk(findbookUser)
            if(userFound){
                const orderList = await Compras.findAll({
                    where:{
                        user_id: findbookUser
                    },
                    include:{
                        model: Items,
                    }
                })
                if(orderList.length){
                    return res.json(orderList)
                }else{
                    return res.json({message:"El usuario no ha registrado ninguna operacion"})
                }
            }else{
                return res.json({message: "usuario no encontrado"})
            }
            
        }else{
            const allOrders = await Compras.findAll({
                include:{
                    model: Items,
                }});
            if(allOrders.length){
                return res.json(allOrders);
            }else{
                return res.json({message:"No hay registros en la aplicacion"})
            }
        }
    }else if(user && user.role === "user" && user.status === 'true'){
        //...el usuario debe poder ver solo su lista de compras
        const orderUser = await Compras.findAll({
            where:{
                user_id: user_id
            },
            include:{
                model: Items,
            }
        })
        if(orderUser.length){
            return res.json(orderUser)
        }{
            return res.json({message:"No se han registrado operaciones"})
        }
    }
}

// "/user/orderList?user=example@gmail.com"