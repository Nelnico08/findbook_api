import { Router } from "express";
import { getBooks } from "../controllers/booksController";

const router = Router();

router.get('/api/books',getBooks);

export default router;
