import { Table, Model, Column, HasOne, ForeignKey, DataType, Unique, Default, HasMany } from "sequelize-typescript";
import { iUsuario, role, status } from "../types/Usuario";
import { Carrito } from "./Carrito";
import { Compras } from "./Compras";
import { Libros } from "./Libros";

@Table
export class Usuario extends Model<iUsuario>{
    @Unique
    @Column
    email!: string

    @Column
    password!: string

    @Unique
    @Column
    username!: string

    @Column
    name!: string

    @Column
    lastname!: string

    @Default('user')
    @Column
    role!: role

    @Column
    url!: string

    @Default('true')
    @Column
    status!: status

    @HasOne(() => Carrito)
    Carrito!: Carrito

    @HasMany(() => Libros)
    libros!: Libros[]

    @HasOne(() => Compras)
    compra!: Compras
}