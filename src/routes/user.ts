import { Router } from "express";
import { putUser } from '../controllers/user/PutUser'
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";
import { deleteBookAdmin } from "../controllers/admin/DeleteBookAdmin";
import { deleteUserAdmin } from "../controllers/admin/DeleteUserAdmin";
import { putBookAdmin } from "../controllers/admin/PutBookAdmin";
import { getBooks } from "../controllers/user/GetBooks";
import { getUser } from "../controllers/admin/GetUser";

const router = Router()

router.get('/getBooks',[verifyToken,verifyUser], getBooks)
router.get('/getUser/:username',[verifyToken,verifyUser], getUser)
router.put('/putBook/:id',[verifyToken,verifyUser], putBookAdmin)
router.put('/putUser/:email',[verifyToken,verifyUser], putUser)
router.delete('/deleteBook/:id',[verifyToken,verifyUser], deleteBookAdmin)
router.delete('/deleteUser/:email',[verifyToken,verifyUser], deleteUserAdmin)

export default router
