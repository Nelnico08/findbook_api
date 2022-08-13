import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Carrito } from "./Carrito";
import { Libros } from "./Libros";

@Table
export class CarritoLibros extends Model{
    @ForeignKey(() => Libros)
    @Column
    libro_id!: number

    @ForeignKey(() => Carrito)
    @Column
    carrito_id!: number
}