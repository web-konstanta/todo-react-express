import { Request, Response } from 'express';
import { ICreateTodoDto, IUpdateTodoDto } from '../interfaces/todo.interface';
import prisma from '../lib/prisma';

export class TodoController {
	// Получить все todos
	public static async getAllTodos(req: Request, res: Response): Promise<void> {
		try {
			const todos = await prisma.todo.findMany();
			res.status(200).json({
				success: true,
				data: todos
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Error fetching todos',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	// Получить todo по id
	public static async getTodoById(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const todo = await prisma.todo.findUnique({
				where: { id }
			});

			if (!todo) {
				res.status(404).json({
					success: false,
					message: 'Todo not found'
				});
				return;
			}

			res.status(200).json({
				success: true,
				data: todo
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Error fetching todo',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	// Создать новый todo
	public static async createTodo(req: Request, res: Response): Promise<void> {
		try {
			const todoData: ICreateTodoDto = req.body;

			if (!todoData.title || !todoData.description) {
				res.status(400).json({
					success: false,
					message: 'Title and description are required'
				});
				return;
			}

			const newTodo = await prisma.todo.create({
				data: todoData
			});

			res.status(201).json({
				success: true,
				data: newTodo
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Error creating todo',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	// Обновить todo
	public static async updateTodo(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const updateData: IUpdateTodoDto = req.body;

			const updatedTodo = await prisma.todo.update({
				where: { id },
				data: updateData
			});

			res.status(200).json({
				success: true,
				data: updatedTodo
			});
		} catch (error) {
			if (error instanceof Error && error.message.includes('Record to update not found')) {
				res.status(404).json({
					success: false,
					message: 'Todo not found'
				});
				return;
			}

			res.status(500).json({
				success: false,
				message: 'Error updating todo',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	// Удалить todo
	public static async deleteTodo(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			await prisma.todo.delete({
				where: { id }
			});

			res.status(200).json({
				success: true,
				message: 'Todo deleted successfully'
			});
		} catch (error) {
			if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
				res.status(404).json({
					success: false,
					message: 'Todo not found'
				});
				return;
			}

			res.status(500).json({
				success: false,
				message: 'Error deleting todo',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}
}