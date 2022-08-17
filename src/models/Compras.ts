import { Table, Column, Model, PrimaryKey, ForeignKey, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Items } from "./Items";
import { Usuario } from "./Usuario";

@Table
export class Compras extends Model{
    @PrimaryKey
    @Column
    id!: string

    @ForeignKey(() => Usuario)
    @Column
    user_id!: number

    @Column
    totalPrice!: number

    @Column(DataType.ENUM("complete", "expired"))
    status!: string

    @BelongsTo(() => Usuario)
    Usuario!: Usuario

    @HasMany(() => Items)
    Items!: Items[]
}