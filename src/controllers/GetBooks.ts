import { NextFunction, Request, Response } from "express";
import { Generos } from "../models/Generos";
import { Libros } from "../models/Libros";
import { LibrosGeneros } from "../models/LibrosGeneros";

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;
    const books = await Libros.findAll({
      include: {
        model: Generos,
        attributes: ["genre"],
        through: {
          attributes: [],
        },
      },
    });
    if (name) {
      let regExp = new RegExp(name.toString(), "i");
      let booksByName = books.filter(({ name }) => regExp.test(name));
      return res.json(
        booksByName.length ? booksByName : `No hay libros con nombre ${name}`
      );
    } else {
      return res.json(books.length ? books : "No hay libros.");
    }
  } catch (error) {
    next(error);
  }
};

export const postBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { books } = req.body
    if (!books) return res.json('Debes enviar los datos para crear un libro')
    else {
      const newBooks = await Libros.bulkCreate(books.map((b: any) => {
        return {
          name: b.name,
          author: b.author,
          category: b.category,
          pages: b.pages,
          publisher: b.publisher,
          description: b.description,
          image: b.image,
          rating: b.rating,
          price: b.price,
          released: b.released,
          language: b.language
        }
      }))
      const getGenres = await books.map(async (b: any) => await b.genre.forEach(async (g: any) => await Generos.findOne({ where: { genre: g } })))
      const resp = await newBooks.map((b: any, i) => getGenres[i].forEach(async (g: any) => await LibrosGeneros.create({ libroid: b.id, generoid: g.id })))
      res.json('Funciona')
    }
  } catch (error) {
    next(error);
  }
}