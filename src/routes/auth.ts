import { Router } from "express";
import { isAdmin } from "../authentication/authAdmin";
import { registerUser,loginUser } from "../authentication/authLogRes";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/admin',[verifyToken],isAdmin);

export default router;