import { Router } from 'express';
import { getUsers } from '../controllers/admin/GetUsers';
import { putBookAdmin } from '../controllers/admin/PutBookAdmin';
import { deleteUserAdmin } from '../controllers/admin/DeleteUserAdmin';
import { deleteBookAdmin } from '../controllers/admin/DeleteBookAdmin';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import { getUser } from '../controllers/admin/GetUser';
import { getBooks } from '../controllers/user/GetBooks';
import { putUserAdmin } from '../controllers/admin/PutUserAdmin'
import { deleteComent } from '../controllers/user/PostComent';
const router = Router();

router.get('/users', [verifyToken, verifyAdmin], getUsers)
router.get('/usersDetail', [verifyToken, verifyAdmin], getUser)
router.get('/books', [verifyToken, verifyAdmin], getBooks)
router.put('/putbook/:id', [verifyToken, verifyAdmin], putBookAdmin)
router.put('/putuser/:email', [verifyToken, verifyAdmin], putUserAdmin)
router.delete('/deleteuser/:email/:status', [verifyToken, verifyAdmin], putUserAdmin)
router.delete('/deletebook/:id', [verifyToken, verifyAdmin], deleteBookAdmin);
router.delete('/deletecomment/:id', [verifyToken, verifyAdmin], deleteComent);

export default router;