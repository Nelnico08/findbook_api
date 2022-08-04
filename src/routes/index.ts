import { Router } from 'express';
import { getBookById, getBooks, postBooks } from '../controllers/GetBooks';
import { getGenres, postGenre } from '../controllers/Genre';

export const router = Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', postBooks);
router.get('/genres', getGenres);
router.post('/genres', postGenre);
