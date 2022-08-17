import { Router } from 'express';
import { postBooks, postGenre } from '../controllers/CargarDb';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.post('/books', [verifyToken, verifyAdmin] , postBooks);
router.post('/generos', postGenre);

export default router;