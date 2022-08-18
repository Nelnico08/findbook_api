import { Table, Model, Column, ForeignKey, HasMany, HasOne, BelongsTo } from "sequelize-typescript";
import { items } from "../types/Items";
import { Compras } from "./Compras";
import { Libros } from "./Libros";

@Table
export class Items extends Model<items> {
    @ForeignKey(() => Compras)
    @Column
    compras_id!: string
    
    @ForeignKey(() =>Libros)
    @Column
    libro_id!: number

    @Column
    quantity!: number

    @Column
    subTotal!: number

    @BelongsTo(() => Compras)
    Compras!: Compras

    @BelongsTo(() => Libros)
    libro!: Libros
}