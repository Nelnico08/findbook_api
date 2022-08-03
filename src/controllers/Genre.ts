import { NextFunction, Request, Response } from 'express';
import { Generos } from '../models/Generos';

//prettier-ignore
export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
    const { genre } = req.query
  try {
    // const filterGenre = await Generos.findOne()
  } catch (err) {
    next(err);
  }
};
