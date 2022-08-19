import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Favoritos } from './Favoritos'
import { Libros } from "./Libros";

@Table
export class FavoritosLibros extends Model {
    @ForeignKey(() => Libros)
    @Column
    libro_id!: number

    @ForeignKey(() => Favoritos)
    @Column
    Favorito_id!: number
}