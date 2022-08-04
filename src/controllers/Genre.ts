import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';
import { genre } from '../types/Generos';
//prettier-ignore
export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
  const genre = req.query.genre as genre;
  try {
    const filterGenre = await Generos.findOne({
      where: {
        genre
      },
      include: {
        model: Libros,
      }
    })
    res.json(filterGenre?.genre ? filterGenre : `No existe el genero ${genre}`)
  } catch (err) {
    next(err);
  }
};
