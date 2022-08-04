import { Router } from 'express';
import { getBookById, getBooks } from '../controllers/GetBooks';
import { getGenres } from '../controllers/Genre';
import { postBooks, postGenre } from '../controllers/CargarDb';
import { deleteBook } from '../controllers/deleteBook';

export const router = Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/genres', getGenres);
router.delete('books/:id', deleteBook);

router.post('/cargardb/books', postBooks);
router.post('/cargardb/generos', postGenre);
