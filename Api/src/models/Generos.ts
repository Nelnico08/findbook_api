import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript"
import { Libros } from "./Libros"
import { LibrosGeneros } from "./LibrosGeneros"

@Table
export class Generos extends Model {
    @Column(DataType.ENUM('arte', 'anime', 'biografía', 'biología', 'comic', 'comida', 'computación', 'deporte', 'derecho', 'economía', 'estudio', 'ficción', 'historia', 'humor', 'infantil', 'juvenil', 'matemática', 'medicina', 'novela', 'ocio - tiempo libre', 'política', 'salud - desarrollo personal', 'tecnología', 'terror'))
    genre!: string

    @BelongsToMany(() => Libros, () => LibrosGeneros)
    libros!: Libros[]
}