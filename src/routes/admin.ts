import { Router } from 'express';
import { getUsers } from '../controllers/admin/GetUsers';
import { putBookAdmin } from '../controllers/admin/PutBookAdmin';
import { deleteUserAdmin } from '../controllers/admin/DeleteUserAdmin';
import { deleteBookAdmin } from '../controllers/admin/DeleteBookAdmin';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import { getUser } from '../controllers/admin/GetUser';
import { getBooks } from '../controllers/user/GetBooks';
const router = Router();

router.get('/users', [verifyToken, verifyAdmin], getUsers)
router.get('/users/:username', [verifyToken, verifyAdmin], getUser)
router.get('/books', [verifyToken, verifyAdmin], getBooks)
router.put('/putbook/:id', [verifyToken, verifyAdmin], putBookAdmin)
router.delete('/deleteuser/:email', [verifyToken, verifyAdmin], deleteUserAdmin)
router.delete('/deletebook/:id', [verifyToken, verifyAdmin], deleteBookAdmin);

export default router;