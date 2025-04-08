import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import { createTodoValidator, updateTodoValidator } from '../validators/todo.validator';

const router = Router();

router.get('/', TodoController.getAllTodos);
router.get('/:id', TodoController.getTodoById);
router.post('/', createTodoValidator, TodoController.createTodo);
router.put('/:id', updateTodoValidator, TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export const todoRouter = router;