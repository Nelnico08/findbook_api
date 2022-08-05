import { Table, Model, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Items } from "./Items";
import { Usuario } from "./Usuario";

@Table
export class CarritoCompras extends Model {
    @ForeignKey(() => Items)
    @Column
    itemsid!: number

    @HasMany(() => Items)
    items!: Items[]

    @ForeignKey(() => Usuario)
    @Column
    userid!: number

    @BelongsTo(() => Usuario)
    Usuario!: Usuario
}