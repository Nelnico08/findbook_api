import { Router } from "express";
import { putUserAdmin } from '../controllers/user/PutUser'
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";
import { deleteBookAdmin } from "../controllers/admin/DeleteBookAdmin";
import { deleteUserAdmin } from "../controllers/admin/DeleteUserAdmin";
import { putBookAdmin } from "../controllers/admin/PutBookAdmin";
import { getBookDetail, getBooks } from "../controllers/user/GetBooks";
import { getUser } from "../controllers/admin/GetUser";
import { addToFavo, getUserFavo, removeAllBooksFavo, removeToFavo } from "../controllers/user/Favorites";
import { getOrderById, getUserOrders } from "../controllers/OrderLists";
import { PostComent } from "../controllers/user/PostComent";
const router = Router()

router.get('/getBooks', [verifyToken, verifyUser], getBooks)
router.get('/getBooks/:id', [verifyToken, verifyUser], getBookDetail)
router.get('/getUser', [verifyToken, verifyUser], getUser)
router.get("/getfavo", [verifyToken, verifyUser], getUserFavo)
router.get('/orderlist', [verifyToken, verifyUser], getUserOrders)
router.get('/orderlist/:id', [verifyToken, verifyUser], getOrderById)
router.put('/putBook/:id', [verifyToken, verifyUser], putBookAdmin)
router.put('/putUser/:email', [verifyToken, verifyUser], putUserAdmin)
router.post('/addtofavo', [verifyToken, verifyUser], addToFavo)
router.post('/addtoComent/:id', [verifyToken, verifyUser], PostComent)
router.delete('/deleteBook/:id', [verifyToken, verifyUser], deleteBookAdmin)
router.delete('/deleteUser/:email', [verifyToken, verifyUser], deleteUserAdmin)
router.delete('/removetofavo', [verifyToken, verifyUser], removeToFavo)
router.delete('/removeallbooksfavo', [verifyToken, verifyUser], removeAllBooksFavo)

export default router