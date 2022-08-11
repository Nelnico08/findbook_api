import { Table, Model, Column, HasOne, ForeignKey, DataType, Unique } from "sequelize-typescript";
import { iUsuario } from "../types/Usuario";
import { CarritoCompras } from "./CarritoCompras";

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

    @Column(DataType.ENUM('user','admin'))
    role!: string

    @Column
    url!: string

    @HasOne(() => CarritoCompras)
    CarritoCompras!: CarritoCompras
}