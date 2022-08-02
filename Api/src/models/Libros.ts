import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table
export class Libros extends Model {
    @Column
    name!: string;

    @Column
    author!: string;

    @Column
    category!: string;

    @Column
    pages!: number;

    @Column
    publisher!: string;

    @Column(DataType.STRING(500))
    description!: string;

    @Column
    image!: string;

    @Column(DataType.ENUM('0', '1', '2', '3', '4', '5'))
    rating!: string;

    @Column
    price!: string;

    @Column
    released!: string;

    @Column
    language!: string
}