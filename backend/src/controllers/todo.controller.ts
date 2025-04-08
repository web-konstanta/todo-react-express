import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/lib';
import TodoService from '../services/todo.service';
import HttpError from '../expection/http.error';

class TodoController {
	private static formatResponse<T>(
		res: Response,
		data: T,
		statusCode: number = 200,
		message?: string
	): Response {
		return res.status(statusCode).json({
			success: true,
			data,
			...(message && { message })
		});
	}

	public static async getAllTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const todos = await TodoService.getAllTodos();
			TodoController.formatResponse(res, todos, 200, 'Todos retrieved successfully');
		} catch (error) {
			next(error);
		}
	}

	public static async getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const todo = await TodoService.getTodoById(id);

			if (!todo) {
				throw HttpError.badRequest(404, 'Todo not found');
			}

			TodoController.formatResponse(res, todo, 200, 'Todo fetched successfully');
		} catch (error) {
			next(error);
		}
	}

	public static async createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw HttpError.validationError(errors.array());
			}

			const todo = await TodoService.createTodo({ ...req.body, userId: req.user?.id! });
			TodoController.formatResponse(res, todo, 201, 'Todo created successfully');
		} catch (error) {
			next(error);
		}
	}

	public static async updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const todo = await TodoService.updateTodo(id, req.body);

			if (!todo) {
				throw HttpError.badRequest(404, 'Todo not found');
			}

			TodoController.formatResponse(res, todo, 200, 'Todo updated successfully');
		} catch (error) {
			next(error);
		}
	}

	public static async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const todo = await TodoService.deleteTodo(id);

			if (!todo) {
				throw HttpError.badRequest(404, 'Todo not found');
			}

			TodoController.formatResponse(res, todo, 200, 'Todo deleted successfully');
		} catch (error) {
			next(error);
		}
	}
}

export default TodoController;