import { Router } from "express";
import { getSessionId, paymentInt } from "../controllers/Payment";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.post('/secret',[verifyToken,verifyUser], paymentInt);
router.get('/secret',[verifyToken,verifyUser], getSessionId)


export default router;
