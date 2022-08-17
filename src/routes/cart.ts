import { Router } from "express";
import { addToCart, getUserCart, removeAllBooks, removeToCart } from "../controllers/Cart";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router()

router.get("/getcart", [verifyToken, verifyUser], getUserCart)
router.post('/addtocart', [verifyToken, verifyUser], addToCart)
router.delete('/removetocart', [verifyToken, verifyUser], removeToCart)
router.delete('/removeallbooks', [verifyToken, verifyUser], removeAllBooks)

export default router;