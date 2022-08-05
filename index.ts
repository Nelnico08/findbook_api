import app from './src/app';
import { sequelize } from './src/db';
import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});
