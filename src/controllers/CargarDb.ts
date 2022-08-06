import { NextFunction, Request, Response } from 'express';
import { iGeneros } from '../types/Generos';
import mockgenre from '../../mock/mockgenre.json';
import { Generos } from '../models/Generos';
import { iLibros } from '../types/Libros';
import mockdata from '../../mock/mockdata.json';
import { Libros } from '../models/Libros';
import { LibrosGeneros } from '../models/LibrosGeneros';

//esta funcion es llamada 1 sola vez para cargar la db
export const postGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //transformo el mock de genero en un array de interfaces de genero
    const myDBGenres = await Generos.findAll();
    if(!myDBGenres.length){
      const genres: iGeneros[] = mockgenre as iGeneros[];
      await Generos.bulkCreate(genres);
      return res.send('se crearon los generos');
    }
    else{
      return res.send('Ya estan creados');
    }
  } catch (error) {
    next(error);
  }
};

export const postBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myDBBooks = await Libros.findAll();
    if(!myDBBooks.length){ 
    const books: iLibros[] = mockdata as iLibros[];
    await Libros.bulkCreate(
      books.map((b: any) => {
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
      })
    );
    const BooksId = await (await Libros.findAll({ attributes: ['id'] })).sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0; 
    });

    const getGenres = books.map((b: any) =>
      b.genre.map((g: any) =>
        Generos.findOne({ where: { genre: g }, attributes: ['id'] })
      )
    );
  
    let arr = [] as any[];
    for (let i = 0; i < getGenres.length; i++) {
      await Promise.all(getGenres[i]).then((r) => arr.push(r));
    }

    for (let i = 0; i < BooksId.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        await LibrosGeneros.create({
          libroid: BooksId[i].id,
          generoid: arr[i][j].id,
        });
      }
    }
    return res.json('DataBase Cargada');
  }else{
    return res.json('La DataBase Ya Esta Cargada');
  }
  } catch (error) {
    next(error);
  }
};
