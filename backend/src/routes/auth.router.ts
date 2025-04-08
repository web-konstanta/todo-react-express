import { Router } from 'express';
import { authValidator } from '../validators/auth.validator';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/sign-up', authValidator, AuthController.signUp);

export const authRouter = router;