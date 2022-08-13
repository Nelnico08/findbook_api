import { Table, Model, Column, HasOne, ForeignKey, DataType, Unique, Default } from "sequelize-typescript";
import { iUsuario } from "../types/Usuario";
import { Carrito } from "./Carrito";

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
    @Column(DataType.ENUM('user','admin'))
    role!: string

    @Column
    url!: string

    @HasOne(() => Carrito)
    Carrito!: Carrito
}