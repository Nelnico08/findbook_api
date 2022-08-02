import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { Generos } from "./Generos";
import { LibrosGeneros } from "./LibrosGeneros";

@Table
export class Libros extends Model {
    @Column
    name!: string;

    @Column
    author!: string;

    @Column(DataType.ENUM('todos', 'infantil', 'adolecentes', 'adultos', 'sin clasificación'))
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