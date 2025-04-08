import { Router } from 'express';
import TodoController from '../controllers/todo.controller';

const router = Router();

router.get('/', TodoController.getAllTodos);
router.get('/:id', TodoController.getTodoById);

export const userRouter = router;