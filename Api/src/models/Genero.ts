import { Table, Model, Column, DataType } from "sequelize-typescript"

@Table
export class Genero extends Model {
    @Column(DataType.ENUM('arte', 'biografía', 'biología', 'comic', 'comida', 'computación', 'deporte', 'derecho', 'economía', 'estudio', 'ficción', 'historia', 'humor', 'infantil', 'juvenil', 'matemática', 'medicina', 'novela', 'ocio - tiempo libre', 'política', 'salud - desarrollo personal', 'tecnología', 'terror'))
    genre!: string
}