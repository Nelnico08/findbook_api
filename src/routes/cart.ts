import { Router } from "express";
import { addToCart } from "../controllers/cart";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router()

router.post('/addtocart', [verifyToken, verifyUser], addToCart)

export default router;