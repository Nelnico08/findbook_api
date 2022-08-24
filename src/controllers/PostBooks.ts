import { NextFunction, Request, Response } from 'express';
import { Libros } from '../models/Libros';
import { Generos } from '../models/Generos';
import { LibrosGeneros } from '../models/LibrosGeneros';
import { iLibros } from '../types/Libros';

export const PostBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user_id as number
    const book = req.body as iLibros;
    const newBook = await Libros.create({
        name: book.name,
        author: book.author,
        category: book.category,
        pages: book.pages,
        publisher: book.publisher,
        description: book.description,
        image: book.image,
        rating: book.rating,
        price: book.price,
        released: book.released,
        language: book.language,
        User_id: user_id
    });

    const getGenres = req.body.genre.map(
      async (g: any) =>
        await Generos.findOne({ where: { genre: g }, attributes: ['id'] })
    );

    const idGenres = await Promise.all(getGenres).then((values) => values);
    // let arr = [] as any[];
    // for (let i = 0; i < genre.length; i++) {
    //     arr.push(genre[i])
    // }
    for (let i = 0; i < idGenres.length; i++) {
      await LibrosGeneros.create({
        libroid: newBook.id,
        generoid: idGenres[i].id,
      });
    }
    res.json('YES');
  } catch (error) {
    next(error);
  }
};
