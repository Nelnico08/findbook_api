import { Router } from "express";
import { registerUser,loginUser } from "../controllers/authentication/authLogRes";
import { verifyToken } from "../middlewares/verifyToken";
import { isUser } from "../controllers/authentication/isUser";
const router = Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/user',[verifyToken],isUser);

export default router;


