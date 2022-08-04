import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';
import mockgenre from '../../mock/mockgenre.json';
import { genre, iGeneros } from '../types/Generos';
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

//esta funcion es llamada 1 sola vez para cargar la db
export const postGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //hago que mockgenre tome la interfase de generos y eso lo guardo en una constante genres
    const genres: iGeneros[] = mockgenre as iGeneros[];
    //bulkcreate necesita un array, nuestro mock es un array
    await Generos.bulkCreate(genres);
    res.send('se crearon los generos');
  } catch (error) {
    next(error);
  }
};
