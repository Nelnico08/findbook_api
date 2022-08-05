import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    const books = await Libros.findAll({
      include: {
        model: Generos,
        attributes: ['genre'],
        through: {
          attributes: [],
        },
      },
    });
    if (name) {
      let regExp = new RegExp(name.toString(), 'i');
      let booksByName = books.filter(({ name }) => regExp.test(name));
      return res.json(
        booksByName.length ? booksByName : `No hay libros con nombre ${name}`
      );
    } else {
      return res.json(books.length ? books : 'No hay libros.');
    }
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const book = await Libros.findOne({
      where: {
        id,
      },
      include: {
        model: Generos,
        attributes: ['genre'],
        through: {
          attributes: [],
        },
      },
    });
    if (!book) return res.json('Libro no encontrado.');

    res.json(book);
  } catch (err) {
    next(err);
  }
};
