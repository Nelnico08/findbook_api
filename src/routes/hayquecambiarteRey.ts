import { Router } from "express";
import { addToCart, getUserCart } from "../controllers/cart";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router()

router.get("/getcart", [verifyToken, verifyUser], getUserCart)
router.post('/addtocart', [verifyToken, verifyUser], addToCart)

export default router;