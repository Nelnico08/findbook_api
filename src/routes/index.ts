import { Router } from 'express';
import { getBookById, getBooks } from '../controllers/GetBooks';
import { getGenres } from '../controllers/Genre';
import { postBooks, postGenre } from '../controllers/CargarDb';

export const router = Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/cargardb/books', postBooks);
router.get('/genres', getGenres);
router.post('/cargardb/generos', postGenre);
