import { Router } from 'express';

import { getGenres } from '../controllers/Genre';

export const router = Router();

router.get('/genres', getGenres);
