import { Table, Model, Column, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { CarritoLibros } from "./CarritoLibros";
import { Libros } from "./Libros";
import { Usuario } from "./Usuario";

@Table
export class Carrito extends Model {
    @ForeignKey(() => Usuario)
    @Column
    userid!: number

    @BelongsToMany(() => Libros, () => CarritoLibros)
    Libros!: Libros[]

    @BelongsTo(() => Usuario)
    Usuario!: Usuario
}