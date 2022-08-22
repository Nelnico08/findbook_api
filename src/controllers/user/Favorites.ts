import { NextFunction, Request, Response } from "express"
import { Favoritos } from "../../models/Favoritos"
import { FavoritosLibros } from "../../models/FavoritosLibros"
import { Libros } from "../../models/Libros"

export const addToFavo = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;
    const book_id = req.body.id;
    try {
        const favo = await Favoritos.findOne({ where: { userid: user_id } });

        if (favo) {
            const bookFound = await FavoritosLibros.findOne({ where: { libro_id: book_id, Favorito_id: favo.id  } })
            if (bookFound) return res.json({ message: "El libro ya se encuentra en favoritos" })
            await FavoritosLibros.create({ libro_id: book_id, Favorito_id: favo.id })

            return res.json({ message: "El libro fue agregado" })
        }
        return res.json({ message: "No se encontro a favoritos" })

    } catch (err) {
        next(err)
    }
}

export const getUserFavo = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;
    try {
        const userfavo = await Favoritos.findOne(
            {
                where: {
                    userid: user_id
                },
                include: {
                    model: Libros,
                    attributes: ['id', 'name', 'price', 'image', "author", "language"],
                    through: {
                        attributes: [],
                    }
                }
            }
        )
        if (userfavo) {
            if (userfavo.Libros.length) {
                return res.json(userfavo)
            }
            return res.json({ message: "No tienes favoritos" })
        }
        return res.json({ message: "No se encontro a favoritos" })

    } catch (error) {
        next(error)
    }
}

export const removeToFavo = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;
    const book_id = req.body.id;
    try {
        const favo = await Favoritos.findOne({ where: { userid: user_id } });

        if (favo) {
            const bookFound = await FavoritosLibros.findOne({ where: { libro_id: book_id, Favorito_id: favo.id } })
            if (bookFound) {
                await bookFound.destroy();
                return res.json({ message: "El libro fue removido de favoritos" })
            }
            return res.json({ message: "El libro no se encuentra en favoritos" })
        }
        return res.json({ message: "No se encontro a favoritos" })
    } catch (err) {
        next(err)
    }
}

export const removeAllBooksFavo = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;

    try {
        const favo = await Favoritos.findOne({ where: { userid: user_id } });

        if (favo) {
            await FavoritosLibros.destroy({ where: { Favorito_id: favo.id } });
            return res.json({ message: "Favoritos ha sido vaciado" })
        }
        return res.json({ message: "No se encontro a favoritos" })
    } catch (error) {
        next(error)
    }
}