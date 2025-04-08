import { Router } from 'express';
import { authValidator } from '../validators/auth.validator';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/sign-up', authValidator, AuthController.signUp);
router.post('/sign-in', authValidator, AuthController.signIn);

export const authRouter = router;