import { Router } from 'express';
import { courseRouter } from './thoughtRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use('/thoughts', courseRouter);
router.use('/users', userRouter);

export default router;
