import { Router } from 'express';
import { getBookById, getBooks } from '../controllers/GetBooks';
import { PostBooks } from '../controllers/PostBooks';
import { deleteBook } from '../controllers/DeleteBook';

const router = Router();

router.get('/', getBooks);
router.post('/', PostBooks);
router.get('/:id', getBookById);
router.delete('/:id', deleteBook);

export default router;