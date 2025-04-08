import { NextFunction, Request, Response } from 'express';
import { ICreateTodoDto, IUpdateTodoDto } from '../interfaces/todo.interface';
import prisma from '../lib/prisma';
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
		const todos = await prisma.todo.findMany();
		TodoController.formatResponse(res, todos, 200, 'Todos retrieved successfully');
	}

	public static async getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = parseInt(req.params.id);
		const todo = await TodoService.getTodoById(id);

		if (!todo) {
			throw HttpError.badRequest(404, 'Todo not found');
		}

		TodoController.formatResponse(res, todo, 200, 'Todo fetched successfully')
	}
}

export default TodoController;