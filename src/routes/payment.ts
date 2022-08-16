import { Router } from "express";
import { paymentInt } from "../controllers/Payment";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.post('/secret',[verifyToken,verifyUser], paymentInt);


export default router;
