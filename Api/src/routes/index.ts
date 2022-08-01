import { Router } from 'express';
import { getExample } from '../controllers/example';

export const router = Router();

router.get('/example', getExample);
