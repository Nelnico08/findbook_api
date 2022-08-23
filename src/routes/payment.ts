import { Router } from "express";
import { buttonSwitch, counterForButton, getSessionId, paymentInt } from "../controllers/Payment";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.post('/secret',[verifyToken,verifyUser], paymentInt);
router.get('/secret/session/:session_id',[verifyToken,verifyUser], getSessionId)
router.get('/secret/buttonstate',[verifyToken,verifyUser], buttonSwitch);
router.get('/secret/counter',[verifyToken,verifyUser], counterForButton)

export default router;
