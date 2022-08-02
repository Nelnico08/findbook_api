import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

export let sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASS,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
        storage: ':memory:',
        models: [__dirname + '/models'],
      })
    : new Sequelize({
        dialect: 'postgres',
        database: DB_NAME,
        password: DB_PASS,
        username: DB_USER,
        storage: ':memory:',
        models: [__dirname + '/models'],
        logging: false,
      });
