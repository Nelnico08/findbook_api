import { NextFunction, Request, Response } from "express";
import { Generos } from "../models/Generos";
import { Libros } from "../models/Libros";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name } = req.query;
    const books = await Libros.findAll({
        include:{
            model: Generos,
            attributes: ['genre'],
            through:{
                attributes:[]
            }
        }
    });
    if (name) {
      let regExp = new RegExp(name.toString(), "i");
      let booksByName = books.filter(({ name }) => regExp.test(name));
      res.json(
        booksByName.length ? booksByName : `No hay libros con nombre ${name}`
      );
    } else {
      res.json(books.length ? books : "No hay libros.");
    }
  } catch (error) {
    next(error);
  }
};

// export const postBooks = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let {
//       name,
//       author,
//       category,
//       pages,
//       publisher,
//       description,
//       image,
//       rating,
//       price,
//       released,
//       language,
//       generos,
//     } = req.body;

//     if (
//       name &&
//       author &&
//       category &&
//       pages &&
//       publisher &&
//       description &&
//       image &&
//       rating &&
//       price &&
//       released &&
//       language &&
//       generos.length
//     ) {
//         const book = await Libros.create({
//             name,
//             author,
//             category,
//             pages,
//             publisher,
//             description,
//             image,
//             rating,
//             price,
//             released,
//             language,
//         });

//         res.json(book)
        
//     }else{
//         res.send("Faltan datos obligatorios")
//     }

//   } catch (error) {
//     next(error);
//   }
// };
