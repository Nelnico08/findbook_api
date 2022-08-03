import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { iCarritoCompras } from "../types/CarritoCompras";
import { Usuario } from "./Usuario";

@Table
export class CarritoCompras extends Model<iCarritoCompras>{
    @Column(DataType.ARRAY(DataType.STRING))
    items!: string[]

    @ForeignKey(() => Usuario)
    @Column
    userid!: number

    @BelongsTo(() => Usuario)
    Usuario!: Usuario
}