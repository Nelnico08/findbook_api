import { Table, Model, Column, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { iItems } from "../types/Items";
import { CarritoCompras } from "./CarritoCompras";
import { Libros } from "./Libros";

@Table
export class Items extends Model<iItems>{
    @Column
    amount!: number

    @ForeignKey(() => Libros)
    @Column
    libroid!: number

    @HasOne(() => Libros)
    libros!: Libros

    @BelongsTo(() => CarritoCompras)
    shoppingcart!: CarritoCompras
}