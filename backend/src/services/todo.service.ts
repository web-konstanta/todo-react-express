import { ITodo } from "../interfaces/todo.interface";
import prisma from "../lib/prisma";
import { Status } from "@prisma/client";
import HttpError from "../expection/http.error";
import { statusMap } from "../utils/user.statuses";

class TodoService {
	public static async getAllTodos(): Promise<ITodo[]> {
		return prisma.todo.findMany();
	}

	public static async getTodoById(id: number): Promise<ITodo | null> {
		return prisma.todo.findUnique({ where: { id } });
	}

	public static async createTodo(data: Omit<ITodo, 'id'>): Promise<ITodo> {
		const { userId, ...todoData } = data;
		return prisma.todo.create({
			data: {
				...todoData,
				user: { connect: { id: userId } }
			},
			select: {
				id: true,
				title: true,
				description: true,
				status: true,
				createdAt: true
			}
		});
	}

	public static async updateTodo(id: number, data: Partial<ITodo>): Promise<ITodo | null> {
		const todo = await this.getTodoById(id);

		if (!todo) {
			throw HttpError.badRequest(400, 'Todo not found');
		}

		const { id: _, ...updateData } = data;
		return prisma.todo.update({
			where: { id },
			data: {
				...updateData,
				status: statusMap[updateData.status!]
			},
			select: {
				id: true,
				title: true,
				description: true,
				status: true,
				updatedAt: true
			}
		});
	}

	public static async deleteTodo(id: number): Promise<ITodo | null> {
		return prisma.todo.delete({
			where: { id }
		});
	}
}

export default TodoService;