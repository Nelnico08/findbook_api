import { NextFunction, Request, Response } from "express"
import { iComentarios } from "../../types/Comentarios"
import { Comentarios } from '../../models/Comentarios'

export const PostComent = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id
    const book_id = Number(req.params)
    const comentario: string = req.body
    try {
        await Comentarios.create({
            Comentario: comentario,
            libroid: book_id,
            usuarioid: user_id
        })
        res.json('Comentario agregado correctamente')
    } catch (error) {
        next(error)
    }
}

export const DeleteComent = async (req: Request, res: Response, next: NextFunction) => {
    const comentarioid = req.params
    const user_id = req.user_id
    try {
        Comentarios.destroy({ where: { id: comentarioid } })
        res.json('Comentario eliminado correctamente')
    } catch (error) {
        next(error)
    }
}