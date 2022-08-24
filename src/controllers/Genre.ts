import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';
import { genre } from '../types/Generos';

export const getGenres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const genre = req.query.genre as genre;

  const { page, size } = req.query;
  const pageAsNumber = page ? Number(page) : 1;
  const sizeAsNumber = size ? Number(size) : 10;
  let currentPage = 0;
  let contentSize = 10;

  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    currentPage = pageAsNumber - 1;
  }
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
    contentSize = sizeAsNumber;
  }
  try {
    if (!genre) {
      const generos = await Generos.findAll();
      return res.json(generos.length ? generos : 'Base de datos vacia');
    }
    const filterGenre = await Generos.findAndCountAll({
      where: {
        genre,
      },
      include: {
        model: Libros,
        where:{
          statusBook: 'true'
        }
      },
      distinct: true,
      limit: contentSize,
      offset: currentPage * contentSize,
    });
    res.json(
      filterGenre.rows.length
        ? {
            content: filterGenre.rows,
            totalBooks: filterGenre.count,
            maxPages: Math.ceil(filterGenre.count / contentSize),
          }
        : { message: `No hay libros con el genero ${genre}.` }
    );
  } catch (err) {
    next(err);
  }
};
