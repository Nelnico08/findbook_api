import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Comentarios } from '../models/Comentarios';
import { Generos } from '../models/Generos';
import { Libros } from '../models/Libros';
import { Usuario } from '../models/Usuario';

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, page, size } = req.query;
    let books;
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
    if (name) {
      books = await Libros.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
          statusBook: 'true'
        },
        include: {
          model: Generos,
          attributes: ['genre'],
          through: {
            attributes: [],
          },
        },
        distinct: true,
        limit: contentSize,
        offset: currentPage * contentSize,
      });
    } else {
      books = await Libros.findAndCountAll({
        where:{statusBook:'true'},
        include: {
          model: Generos,
          attributes: ['genre'],
          through: {
            attributes: [],
          },
        },
        distinct: true,
        limit: contentSize,
        offset: currentPage * contentSize,
      });
    }
    return res.json(
      books.rows.length
        ? {
            content: books.rows,
            totalBooks: books.count,
            maxPages: Math.ceil(books.count / contentSize),
          }
        : { message: 'No hay libros' }
    );
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
      include: [{
        model: Generos,
        attributes: ['genre'],
        through: {
          attributes: [],
        },
      },
      {
        model: Comentarios,
        include:[{
          model: Usuario,
          attributes:['name','lastname','url']
        }]
      }]
    });
    if (!book) return res.json({error:'El libro no existe'});
    res.json(book);
  } catch (err) {
    return res.json({error:"El libro no existe"})
  }
};
