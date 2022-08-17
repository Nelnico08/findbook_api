import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { genre, iGeneros } from '../types/Generos';
import { Libros } from './Libros';
import { LibrosGeneros } from './LibrosGeneros';

@Table
export class Generos extends Model<iGeneros> {
  @Column
  genre!: genre;

  @BelongsToMany(() => Libros, () => LibrosGeneros)
  libros!: Libros[];
}
