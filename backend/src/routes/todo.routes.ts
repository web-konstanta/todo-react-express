import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import { createTodoValidator, updateTodoValidator } from '../validators/todo.validator';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/admin', adminMiddleware, TodoController.getAllTodos);

router.get('/', TodoController.getAll);
router.get('/:id', TodoController.getTodoById);
router.post('/', createTodoValidator, TodoController.createTodo);
router.put('/:id', updateTodoValidator, TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export const todoRouter = router;