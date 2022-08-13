import { Router } from 'express';
import booksRouter from './books'
import genreRouter from './genres';
import authRouter from './auth';
import cargarRouter from './cargardb'
import admin from './admin'
import paymentRouter from './payment'
import user from './user';
import cartRouter from './hayquecambiarteRey'

export const router = Router();

router.use('/cargardb', cargarRouter)
router.use('/genres', genreRouter)

router.use('/books', booksRouter)

router.use('/auth', authRouter);

router.use('/admin', admin);

router.use('/user',user);
router.use('/user', cartRouter)

router.use('/payment', paymentRouter);

