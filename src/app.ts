import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './routes';
import booksRouter from './routes/booksRouter';
const app: Application = express();

app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use('/',booksRouter);
app.use('/', router);

export default app;
