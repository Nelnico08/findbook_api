import { Router } from 'express';
import { getUsers } from '../admin/GetUsers';
import { putUserAdmin } from '../admin/PutUserAdmin';
import { putBookAdmin } from '../admin/PutBookAdmin';
import { deleteUserAdmin } from '../admin/DeleteUserAdmin';
import { deleteBookAdmin } from '../admin/DeleteBookAdmin';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
const router = Router();

router.put('/users', [verifyToken, verifyAdmin], getUsers)
router.put('/:id', [verifyToken, verifyAdmin], putUserAdmin)
router.put('/:id', [verifyToken, verifyAdmin], putBookAdmin)
router.delete('/:id', [verifyToken, verifyAdmin], deleteUserAdmin)
router.delete('/:id', [verifyToken, verifyAdmin], deleteBookAdmin);

export default router;