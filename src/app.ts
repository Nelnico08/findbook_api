import express, { Application } from 'express';
import { router } from './routes';
const cors = require('cors')
const app: Application = express();

app.use(express.json());
app.use(
  cors({
   origin: "*",
   credentials: true,
   methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'authorization'],
  }),
 );

app.use('/', router);

export default app;
