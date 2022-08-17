import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { category, iLibros } from '../types/Libros';
import { Carrito } from './Carrito';
import { CarritoLibros } from './CarritoLibros';
import { Generos } from './Generos';
import { Items } from './Items';
import { LibrosGeneros } from './LibrosGeneros';

@Table
export class Libros extends Model<iLibros> {
  @Column
  name!: string;

  @Column
  author!: string;

  @Column
  category!: category;

  @Column
  pages!: number;

  @Column
  publisher!: string;

  @Column(DataType.STRING(2000))
  description!: string;

  @Column
  image!: string;

  @Column
  rating!: number;

  @Column(DataType.DECIMAL)
  price!: number;

  @Column
  released!: string;

  @Column
  language!: string;

  @ForeignKey(() => Items)
  Items_id!: number

  @BelongsToMany(() => Generos, () => LibrosGeneros)
  generos!: Generos[];
  
  @BelongsToMany(() => Carrito, () => CarritoLibros)
  Carrito!: Carrito[]

  @HasMany(() => Items)
  Items!: Items[]
}
