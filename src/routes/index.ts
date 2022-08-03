import { Router } from 'express';
import { getBooks } from '../controllers/GetBooks';
import { getGenres } from '../controllers/Genre';

export const router = Router();


router.get('/books', getBooks);
// router.post('/books',postBooks);

router.get('/genres', getGenres);