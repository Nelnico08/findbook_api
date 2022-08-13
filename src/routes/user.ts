import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";
import { Request, Response } from "express";
import { getCarrito } from "../controllers/user/getCarrito";
const router = Router();

router.get('/',[verifyToken,verifyUser],getCarrito)
export default router;