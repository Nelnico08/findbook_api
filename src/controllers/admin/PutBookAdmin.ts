import { NextFunction, Request, Response } from 'express';
import { Generos } from '../../models/Generos';
import { Libros } from '../../models/Libros';
import { LibrosGeneros } from '../../models/LibrosGeneros';

export const putBookAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const { name, author, category, pages, publisher, description, image, price, released, language, genres } = req.body

        if (name !== '') await Libros.update({ name: name }, { where: { id: id } })
        if (author !== '') await Libros.update({ author: author }, { where: { id: id } })
        if (category !== 'disable') await Libros.update({ category: category }, { where: { id: id } })
        if (pages !== undefined) await Libros.update({ pages: pages }, { where: { id: id } })
        if (publisher !== '') await Libros.update({ publisher: publisher }, { where: { id: id } })
        if (description !== '') await Libros.update({ description: description }, { where: { id: id } })
        if (image !== '') await Libros.update({ image: image }, { where: { id: id } })
        if (price !== undefined) await Libros.update({ price: price }, { where: { id: id } })
        if (released !== '') await Libros.update({ released: released }, { where: { id: id } })
        if (language !== 'disable') await Libros.update({ language: language }, { where: { id: id } })
        if (genres.length > 0) {
            const rel = await LibrosGeneros.destroy({ where: { libroid: id } })
            const getGenres = genres.map(
                async (g: any) =>
                    await Generos.findOne({ where: { genre: g }, attributes: ['id'] })
            );
            const idGenres = await Promise.all(getGenres).then((values) => values);
            for (let i = 0; i < idGenres.length; i++) {
                await LibrosGeneros.create({
                    libroid: id,
                    generoid: idGenres[i].id,
                });
            }
        }
        res.json('Libro Modificado Correctamente')
    } catch (err) {
        next(err);
    }
}