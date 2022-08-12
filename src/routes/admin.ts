import { Router } from 'express';
import { deleteBookAdmin } from '../admin/DeleteBookAdmin';

const router = Router();

router.delete('/:id', deleteBookAdmin);

export default router;