import { Router } from 'express';
import { getUsers } from '../controllers/admin/GetUsers';
import { putUserAdmin } from '../controllers/admin/PutUserAdmin';
import { putBookAdmin } from '../controllers/admin/PutBookAdmin';
import { deleteUserAdmin } from '../controllers/admin/DeleteUserAdmin';
import { deleteBookAdmin } from '../controllers/admin/DeleteBookAdmin';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
const router = Router();

router.get('/users', [verifyToken, verifyAdmin], getUsers)
router.put('/putuser/:id', [verifyToken, verifyAdmin], putUserAdmin)
router.put('/putbook/:id', [verifyToken, verifyAdmin], putBookAdmin)
router.delete('/deleteuser/:id', [verifyToken, verifyAdmin], deleteUserAdmin)
router.delete('/deletebook/:id', [verifyToken, verifyAdmin], deleteBookAdmin);

export default router;