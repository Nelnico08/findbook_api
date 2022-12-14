import { NextFunction, Request, Response } from "express"
import { iComentarios } from "../../types/Comentarios"
import { Comentarios } from '../../models/Comentarios'
import { Libros } from "../../models/Libros"
import { Usuario } from "../../models/Usuario"
import { sendEmail } from "../../utils/email"
import { comment } from "../../utils/messages"

export const PostComent = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id
    const book_id = Number(req.params.id)
    const comentario: string = req.body.Comentario
    if(!comentario.length) return res.json({error: 'El comentario no puede estar vacío.'})
    if(comentario.length>500) return res.json({error: 'El comentario es muy largo TT_TT'})
    try {
        await Comentarios.create({
            Comentario: comentario,
            libroid: book_id,
            usuarioid: user_id
        })
        const userComment = await Usuario.findByPk(user_id)
        const book = await Libros.findOne({
            where:{id:book_id},
            include:{
                model:Usuario,
                attributes:['id','name','email']
            }
        });
        if(book && book.usuario.id !== user_id && userComment){
            const subject= "Comentario en una de tus publicaciones";
            const message= comment.replace("{USER}", `${book.usuario.name}`).replace("{BOOK}", `${book.name}`).replace("{COMENTARIO}",`${comentario}`).replace("{BOOK_ID}", `${book.id}`);
            sendEmail(book.usuario.email, book.usuario.name, message, subject)
        }
        res.json('Comentario agregado correctamente')
    } catch (error) {
        next(error)
    }
}

export const deleteComent = async (req: Request, res: Response, next: NextFunction) => {
    const comentarioid = req.params.id
    try {
        Comentarios.destroy({ where: { id: comentarioid } })
        res.json('Comentario eliminado correctamente')
    } catch (error) {
        next(error)
    }
}