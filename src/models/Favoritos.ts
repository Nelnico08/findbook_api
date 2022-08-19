import { Table, Model, Column, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { FavoritosLibros } from "./FavoritosLibros";
import { Libros } from "./Libros";
import { Usuario } from "./Usuario";

@Table
export class Favoritos extends Model {
    @ForeignKey(() => Usuario)
    @Column
    userid!: number

    @BelongsToMany(() => Libros, () => FavoritosLibros)
    Libros!: Libros[]

    @BelongsTo(() => Usuario)
    Usuario!: Usuario
}