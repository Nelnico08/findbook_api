import { Table, Model, Column, HasOne, ForeignKey } from "sequelize-typescript";
import { iUsuario } from "../types/Usuario";
import { CarritoCompras } from "./CarritoCompras";

@Table
export class Usuario extends Model<iUsuario>{
    @Column
    name!: string

    @Column
    lastname!: string

    @Column
    username!: string

    @Column
    email!: string

    @Column
    password!: string

    @HasOne(() => CarritoCompras)
    CarritoCompras!: CarritoCompras
}