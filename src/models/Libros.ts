import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { iLibros } from "../types/Libros";
import { Generos } from "./Generos";
import { LibrosGeneros } from "./LibrosGeneros";

@Table
export class Libros extends Model<iLibros>{
    @Column
    name!: string;

    @Column
    author!: string;

    @Column(DataType.ENUM('todos', '12+', '16+', '18+', 'sin clasificación'))
    category!: string;

    @Column
    pages!: number;

    @Column
    publisher!: string;

    @Column(DataType.STRING(1000))
    description!: string;

    @Column
    image!: string;

    @Column
    rating!: number;

    @Column
    price!: number;

    @Column
    released!: Date;

    @Column
    language!: string

    @BelongsToMany(() => Generos, () => LibrosGeneros)
    generos!: Generos[]
}