import { Router } from 'express';
import { getBooks, postBooks } from '../controllers/GetBooks';
import { getGenres, postGenre } from '../controllers/Genre';

export const router = Router();


router.get('/books', getBooks);
router.post('/books', postBooks);
router.get('/genres', getGenres);
router.post('/genres', postGenre);