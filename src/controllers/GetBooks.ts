import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';
import { LibrosGeneros } from '../models/LibrosGeneros';
import mockdata from '../../mock/mockdata.json';
import { iLibros } from '../types/Libros';

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

    const libroMap = books.map(async (book: any) => {
      await Libros.create({
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
      });
    });

    console.log(libroMap);

    // console.log(libroMap);
    // await Libros.bulkCreate(libroMap);
    //   books.map((b: any) => {
    //     return {
    //       name: b.name,
    //       author: b.author,
    //       category: b.category,
    //       pages: b.pages,
    //       publisher: b.publisher,
    //       description: b.description,
    //       image: b.image,
    //       rating: b.rating,
    //       price: b.price,
    //       released: b.released,
    //       language: b.language,
    //     };
    //   })
    // );
    // const libros = await Libros.findAll();
    // const librosId = libros.map((libro: any) => {
    //   return libro.id;
    // });
    // const generos = libros.map((libro: any) => {
    //   return libro.genre;
    // }); //[["ficcion"],["arte","terror"],["comic","manga"]]= [[3],[1,24],[10,15]]

    // const generoId = (array: any) => {
    //   const arr = array.map(async (elem: any, index: number) => {
    //     if (typeof elem === 'string') {
    //       const genreFound = await Generos.findOne({ where: { genre: elem } });
    //       const genreId = genreFound?.getDataValue('id');
    //       await LibrosGeneros.create({
    //         libroid: librosId[index],
    //         generoid: genreId,
    //       });
    //     } else {
    //       return generoId(elem);
    //     }
    //   });
    // };

    // generoId(generos);
    // res.json('funciona!');

    // const books = req.body;
    // if (!books) return res.json('Debes enviar los datos para crear un libro');
    // else {
    //   const newBooks = await Libros.bulkCreate(
    //     books.map((b: any) => {
    //       return {
    //         name: b.name,
    //         author: b.author,
    //         category: b.category,
    //         pages: b.pages,
    //         publisher: b.publisher,
    //         description: b.description,
    //         image: b.image,
    //         rating: b.rating,
    //         price: b.price,
    //         released: b.released,
    //         language: b.language,
    //       };
    //     })
    //   );
    // }
    // const getGenres = await books.map(
    //   async (b: any) =>
    //     await b.genre.forEach(
    //       async (g: any) => await Generos.findOne({ where: { genre: g } })
    //     )
    // );
    // const resp = await newBooks.map((b: any, i) =>
    //   getGenres[i].forEach(
    //     async (g: any) =>
    //       await LibrosGeneros.create({ libroid: b.id, generoid: g.id })
    //   )
    // );
    res.json('Funciona');
  } catch (error) {
    next(error);
  }
};
