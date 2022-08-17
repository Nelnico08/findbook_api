import { Router } from 'express';
import { getBookById, getBooks } from '../controllers/GetBooks';
import { PostBooks } from '../controllers/PostBooks';
import { deleteBook } from '../controllers/DeleteBook';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyUser } from '../middlewares/verifyUser';

const router = Router();

router.get('/', getBooks);
router.post('/', [verifyToken, verifyUser], PostBooks);
router.get('/:id', getBookById);
router.delete('/:id', deleteBook);

export default router;