import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Generos } from "./Generos";
import { Libros } from "./Libros";

@Table
export class LibrosGeneros extends Model {
    @ForeignKey(() => Libros)
    @Column
    libroid!: number

    @ForeignKey(() => Generos)
    @Column
    generoid!: number
}