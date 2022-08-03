import { NextFunction, Request, Response } from 'express';
import data from '../../mock/mockdata.json';
import { iLibros } from '../types/Libros';

export const getGenres = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};
