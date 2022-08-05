import { NextFunction, Request, Response } from 'express';
import { Libros } from '../models/Libros';
import { LibrosGeneros } from '../models/LibrosGeneros';

export const PostBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [name, author, genre, category, pages, publisher, description, image, rating, price, released, language] = req.body
        const [newBook, Book] = await Libros.findOrCreate({
            where: {
                name: name
            },
            defaults: {
                name: name,
                author: author,
                category: category,
                pages: pages,
                publisher: publisher,
                description: description,
                image: image,
                rating: rating,
                price: price,
                released: released,
                language: language
            }
        })
        let arr = [] as any[];
        for (let i = 0; i < genre.length; i++) {
            arr.push(genre[i])
        }
        for (let i = 0; i < arr.length; i++) {
            await LibrosGeneros.create({
                libroid: newBook.id,
                generoid: arr[i],
            });
        }
        res.json('Libro Posteado Correctamente')
    } catch (error) {
        next(error);
    }
};