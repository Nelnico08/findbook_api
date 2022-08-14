import { Router } from "express";
import { addToCart, getUserCart, removeToCart } from "../controllers/Cart";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router()

router.get("/getcart", [verifyToken, verifyUser], getUserCart)
router.post('/addtocart', [verifyToken, verifyUser], addToCart)
router.delete('/removetocart', [verifyToken, verifyUser], removeToCart)

export default router;