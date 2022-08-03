import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript"
import { iGeneros } from "../types/Generos"
import { Libros } from "./Libros"
import { LibrosGeneros } from "./LibrosGeneros"

@Table
export class Generos extends Model<iGeneros>{
    @Column(DataType.ENUM('arte', 'biografía', 'biología', 'comic', 'comida', 'computación', 'deporte', 'derecho', 'economía', 'estudio', 'ficción', 'historia', 'humor', 'infantil', 'juvenil', 'manga', 'matemática', 'medicina', 'novela', 'ocio - tiempo libre', 'política', 'salud - desarrollo personal', 'tecnología', 'terror'))
    genre!: string

    @BelongsToMany(() => Libros, () => LibrosGeneros)
    libros!: Libros[]
}