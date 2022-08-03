import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { iCarritoCompras } from "../types/CarritoCompras";
import { Usuario } from "./Usuario";

@Table
export class CarritoCompras extends Model<iCarritoCompras>{
    @Column
    items!: string[]

    @ForeignKey(() => Usuario)
    @Column
    userid!: number

    @BelongsTo(() => Usuario)
    Usuario!: Usuario
}