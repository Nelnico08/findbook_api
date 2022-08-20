import { Table, Model, Column, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { Libros } from "./Libros";
import { iComentarios } from "../types/Comentarios";

@Table
export class Comentarios extends Model<iComentarios> {
    @Column(DataType.STRING(500))
    Comentario!: string

    @ForeignKey(() => Libros)
    @Column
    libroid!: number

    @ForeignKey(() => Usuario)
    @Column
    usuarioid!: number

    @BelongsTo(() => Usuario)
    usuario!: Usuario

    @BelongsTo(() => Libros)
    Libros!: Libros
}