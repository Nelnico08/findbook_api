import { NextFunction, Request, Response } from 'express';
import { Carrito } from '../../models/Carrito';
import { CarritoLibros } from '../../models/CarritoLibros';
import { Usuario } from '../../models/Usuario';

export const deleteUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.params;
    try {
        const usuario = await Usuario.findOne({ where: { email } })
        if (usuario) {
            const usuarioCarrito = await Carrito.findOne({ where: { userid: usuario?.id } })
            await Carrito.destroy({ where: { userid: usuario.id } });
            await CarritoLibros.destroy({ where: { carrito_id: usuarioCarrito?.id } })
            await Usuario.destroy({ where: { id: usuario.id } });
            res.json('Usuario Eliminado');
        } else {
            return res.send('El usuario no existe')
        }
    } catch (err) {
        next(err);
    }
};