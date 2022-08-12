import { Router } from 'express';
import { deleteBookAdmin } from '../admin/DeleteBookAdmin';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
const router = Router();

router.delete('/:id', [verifyToken,verifyAdmin],deleteBookAdmin);

export default router;