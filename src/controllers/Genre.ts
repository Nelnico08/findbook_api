import { NextFunction, Request, Response } from "express";
import { Generos } from "../models/Generos";
import { Libros } from "../models/Libros";

import { genre } from "../types/Generos";
//prettier-ignore
export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
    const genre  = req.query.genre as genre;
  try {
    const filterGenre = await Generos.findOne({
      where:{
        genre
      },
      include:{
        model: Libros,
      }
    })
    res.json(filterGenre?.genre?filterGenre:`No existe el genero ${genre}`)
  } catch (err) {
    next(err);
  }
};

export const postGenre = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const genre  = req.body.genre as genre;
    const [newGenre,genreBool] = await Generos.findOrCreate({
      where:{genre}
    })
    if(!genreBool){
      return res.json(newGenre);
    }else{
      return res.json(genreBool);
    }
  } catch (error) {
    next(error)
  }
}
