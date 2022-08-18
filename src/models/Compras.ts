import { Table, Column, Model, PrimaryKey, ForeignKey, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { iCompras, status } from "../types/Compras";
import { Items } from "./Items";
import { Usuario } from "./Usuario";

@Table
export class Compras extends Model<iCompras>{
    @PrimaryKey
    @Column({primaryKey: true})
    id!: string

    @ForeignKey(() => Usuario)
    @Column
    user_id!: number

    @Column
    totalPrice!: number

    @Column
    status!: status

    @BelongsTo(() => Usuario)
    Usuario!: Usuario

    @HasMany(() => Items)
    Items!: Items[]
}