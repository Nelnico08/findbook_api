import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey,
  HasMany,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { category, iLibros, statusBook } from '../types/Libros';
import { Carrito } from './Carrito';
import { CarritoLibros } from './CarritoLibros';
import { Comentarios } from './Comentarios';
import { Favoritos } from './Favoritos';
import { FavoritosLibros } from './FavoritosLibros';
import { Generos } from './Generos';
import { Items } from './Items';
import { LibrosGeneros } from './LibrosGeneros';
import { Usuario } from './Usuario';

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

  @Default('true')
  @Column
  statusBook!: statusBook;

  @ForeignKey(() => Items)
  Items_id!: number

  @ForeignKey(() => Usuario)
  User_id!: number

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @BelongsToMany(() => Generos, () => LibrosGeneros)
  generos!: Generos[];

  @HasMany(() => Comentarios)
  comentarios!: Comentarios[]

  @BelongsToMany(() => Carrito, () => CarritoLibros)
  Carrito!: Carrito[]

  @BelongsToMany(() => Favoritos, () => FavoritosLibros)
  Favoritos!: Favoritos[]

  @HasMany(() => Items)
  Items!: Items[]
}
