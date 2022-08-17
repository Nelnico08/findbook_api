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

router.delete('/deleteBook',[verifyToken,verifyUser], deleteBookAdmin)
router.put('/putBook',[verifyToken,verifyUser], putBookAdmin)
router.delete('/deleteUser',[verifyToken,verifyUser], deleteUserAdmin)
router.put('/putUser',[verifyToken,verifyUser], putUser)
router.get('/getBooks',[verifyToken,verifyUser], getBooks)
router.get('/getUser/:username',[verifyToken,verifyUser], getUser)

export default router
