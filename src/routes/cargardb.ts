import { Router } from 'express';
import { postBooks, postGenre } from '../controllers/CargarDb';

const router = Router();

router.post('/books', postBooks);
router.post('/generos', postGenre);

export default router;