import { NextFunction, Request, Response } from 'express';
import { Compras } from '../models/Compras';
import { Items } from '../models/Items';
import { Libros } from '../models/Libros';
import { Usuario } from '../models/Usuario';

export const getUserOrders = async(req:Request, res:Response, next: NextFunction) => {
  const user_id = req.user_id;

  try{
    const user = await Usuario.findByPk(user_id);

    if(user && user.role === "admin"){
      //...el admin debe poder tener acceso a todas las lista de compras
      // si el admin quiere ver las listas de un usuario en particular
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
            },
            order: [['updatedAt', 'DESC']]
          })
          if(orderList.length){
            const userMap = orderList.map(async(user:any) =>{
              const userFound = await Usuario.findByPk(user.user_id);
              if(userFound){
                return{
                  id: userFound.id,
                  email: userFound.email,
                  name: userFound.name,
                  url: userFound.url
                }
              }
            })
            const userPromise = await Promise.all(userMap)
            const list = orderList.map((order: any, index: number) =>{
              return{
                order,
                user: userPromise[index]
              }
            })
            return res.json(list)
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
          },
          order: [['updatedAt', 'DESC']]
        });
        if(allOrders.length){
          const userMap = allOrders.map(async(user:any) =>{
            const userFound = await Usuario.findByPk(user.user_id);
            if(userFound){
              return{
                id: userFound.id,
                email: userFound.email,
                name: userFound.name,
                url: userFound.url
              }
            }
          })
          const userPromise = await Promise.all(userMap)
          const list = allOrders.map((order: any, index: number) =>{
            return{
              order,
              user: userPromise[index]
            }
          })
          return res.json(list);
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
        },
        order: [['updatedAt', 'DESC']]
      })
      if(orderUser.length){
        return res.json(orderUser)
      }else{
        return res.json({message:"No se han registrado operaciones"})
      }
    }else{
          return res.json({message:"Usuario invalido"})
      }
  }catch(err){
      next(err)
  }
}

export const getOrderById = async(req: Request, res:Response, next: NextFunction) => {
  const { id } = req.params;
  const user_id = req.user_id

  try {
    const user = await Usuario.findByPk(user_id);
    let detail = undefined;

    if(user && user.role === 'admin'){
      const foundOrder = await Compras.findOne({
        where:{id},
        include:{
          model: Items
        }
      })
      if(foundOrder){
        const regularUser = await Usuario.findByPk(foundOrder.user_id)
        if(regularUser){
          const books = foundOrder.Items.map(async(book : any) => {
            const libro = await Libros.findByPk(book.libro_id);
            if(libro){
              return{
                Book: libro,
                quantity: book.quantity,
                subTotal: book.subTotal
              }
            }
          })

          const promiseBooks = await Promise.all(books)
          detail = {
            compras_id: foundOrder.id,
            user_id: foundOrder.user_id,
            totalPrice: foundOrder.totalPrice,
            status: foundOrder.status,
            items: promiseBooks,
            user:regularUser
          }
          return res.json(detail)
        }else{
          return res.json({message:"El usuario no se encuentra"})
        }
        
      }else{
        return res.json({message:"No se encontro la lista de compras buscada"})
      }
    }else if(user && user.role === "user" && user.status === 'true') {
      const foundOrder = await Compras.findOne({
        where:{
          id:id,
          user_id: user_id
        },
        include:{
          model: Items
        }
      })
      if(foundOrder){
        const books = foundOrder.Items.map(async(book : any) => {
          const libro = await Libros.findByPk(book.libro_id);
          if(libro){
            return{
              Book: libro,
              quantity: book.quantity,
              subTotal: book.subTotal
            }
          }
        })
        const promiseBooks = await Promise.all(books)
        detail = {
          compras_id: foundOrder.id,
          user_id: foundOrder.user_id,
          totalPrice: foundOrder.totalPrice,
          status: foundOrder.status,
          items: promiseBooks
        }
        return res.json(detail)
      }else{
        return res.json({message: "No se encontro la lista de compras buscada"})
      }
    }else{
      return res.json({message: "Usuario invalido"})
    }
  } catch (error) {
    next(error)
  }
}

export const getUserSells = async(req:Request, res:Response, next: NextFunction) => {
  const user_id = req.user_id;

  try{
    const librosUser = await Libros.findAll({
      attributes:['id'],
      where:{
        User_id: user_id
      }
    })
    if(!librosUser.length) return res.json('El usuario no tiene libros a la venta')
    
    const ventas = librosUser.map(async({id})=>{
      return await Compras.findAll({
        include:{
          model: Items,
          where: {
            libro_id: id
          }
        }
      })
    })
    const ventasPromise = await Promise.all(ventas).then(values=>values);
    console.log(ventasPromise)

    return res.json({ventas:ventasPromise})
    // const ventas = await Compras.findAll({
    //   include:{
    //     model: Items,
    //     where:{

    //     }
    //   },
    // });

    // if(user && user.role === "admin"){
    //   //...el admin debe poder tener acceso a todas las lista de compras
    //   // si el admin quiere ver las listas de un usuario en particular
    //   const findbookUser = Number(req.query.user_id);
      
    //   if(findbookUser){
    //     const userFound = await Usuario.findByPk(findbookUser)
    //     if(userFound){
    //       const orderList = await Compras.findAll({
    //         where:{
    //           user_id: findbookUser
    //         },
    //         include:{
    //           model: Items,
    //         },
    //         order: [['updatedAt', 'DESC']]
    //       })
    //       if(orderList.length){
    //         const userMap = orderList.map(async(user:any) =>{
    //           const userFound = await Usuario.findByPk(user.user_id);
    //           if(userFound){
    //             return{
    //               id: userFound.id,
    //               email: userFound.email,
    //               name: userFound.name,
    //               url: userFound.url
    //             }
    //           }
    //         })
    //         const userPromise = await Promise.all(userMap)
    //         const list = orderList.map((order: any, index: number) =>{
    //           return{
    //             order,
    //             user: userPromise[index]
    //           }
    //         })
    //         return res.json(list)
    //         }else{
    //           return res.json({message:"El usuario no ha registrado ninguna operacion"})
    //         }
    //     }else{
    //         return res.json({message: "usuario no encontrado"})
    //       }
              
    //   }else{
    //     const allOrders = await Compras.findAll({
    //       include:{
    //         model: Items,
    //       },
    //       order: [['updatedAt', 'DESC']]
    //     });
    //     if(allOrders.length){
    //       const userMap = allOrders.map(async(user:any) =>{
    //         const userFound = await Usuario.findByPk(user.user_id);
    //         if(userFound){
    //           return{
    //             id: userFound.id,
    //             email: userFound.email,
    //             name: userFound.name,
    //             url: userFound.url
    //           }
    //         }
    //       })
    //       const userPromise = await Promise.all(userMap)
    //       const list = allOrders.map((order: any, index: number) =>{
    //         return{
    //           order,
    //           user: userPromise[index]
    //         }
    //       })
    //       return res.json(list);
    //     }else{
    //       return res.json({message:"No hay registros en la aplicacion"})
    //     }
    //   }
    // }else if(user && user.role === "user" && user.status === 'true'){
    //   //...el usuario debe poder ver solo su lista de compras
    //     const orderUser = await Compras.findAll({
    //     where:{
    //       user_id: user_id
    //     },
    //     include:{
    //       model: Items,
    //     },
    //     order: [['updatedAt', 'DESC']]
    //   })
    //   if(orderUser.length){
    //     return res.json(orderUser)
    //   }else{
    //     return res.json({message:"No se han registrado operaciones"})
    //   }
    // }else{
    //       return res.json({message:"Usuario invalido"})
    //   }
  }catch(err){
      next(err)
  }
}