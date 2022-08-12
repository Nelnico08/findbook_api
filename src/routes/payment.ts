import { Router } from "express";
import { paymentInt } from "../controllers/Payment";

const router = Router();

router.post('/secret', paymentInt);


export default router;
