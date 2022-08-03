import { Table, Model, Column, DataType } from "sequelize-typescript";
import { iCarritoCompras } from "../types/CarritoCompras";

@Table
export class CarritoCompras extends Model<iCarritoCompras>{
    @Column
    items!: string[]
}