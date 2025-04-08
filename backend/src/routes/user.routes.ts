import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

const router = Router();

router.get('/', TodoController.getAllTodos);

export const userRouter = router;