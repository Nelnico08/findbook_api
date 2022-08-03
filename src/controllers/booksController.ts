import { Libros } from "../models/Libros";
import mock from '../../mock/mockdata.json';
import {Request, Response} from "express";

export const getBooks = (_req:Request,res:Response)=>{
    res.json(mock);
}

// export const getBooks = async (req:Request,res:Response)=>{
//     let {name} = 
// }