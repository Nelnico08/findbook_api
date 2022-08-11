import { Router } from "express";
import { getGenres } from "../controllers/Genre";

const router = Router()

router.get('/', getGenres);

export default router;