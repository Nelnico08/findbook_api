import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';
import { LibrosGeneros } from '../models/LibrosGeneros';
import mockdata from '../../mock/mockdata.json';
import { iLibros } from '../types/Libros';
import { Json } from 'sequelize/types/utils';

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
      include: Generos,
    });
    if (!book) return res.json('Libro no encontrado.');

    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const postBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books: iLibros[] = mockdata as iLibros[];
    await Libros.bulkCreate(books.map((b: any) => {
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
        language: b.language,
      };
    }));
    const BooksId = await Libros.findAll({ attributes: ['id'] })
    const getGenres = books.map((b: any) =>
      b.genre.map(
        (g: any) => Generos.findOne({ where: { genre: g }, attributes: ['id'] })
      )
    )
    let arr = [] as any[]
    for (let i = 0; i < getGenres.length; i++) {
      await Promise.all(getGenres[i])
        .then(r => arr.push(r))
    }
    for (let i = 0; i < BooksId.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        await LibrosGeneros.create({
          libroid: BooksId[i].id,
          generoid: arr[i][j].id,
        });
      }
    }
    const rela = await Libros.findAll({
      include: {
        model: Generos, attributes: ['genre'], through: { attributes: [] }
      }
    })
    res.json('DataBase Cargada')
  } catch (error) {
    next(error);
  }
};