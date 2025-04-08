import { ITodo } from "../interfaces/todo.interface";
import prisma from "../lib/prisma";
import { Status } from "@prisma/client";

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
			}
		});
	}

	public static async updateTodo(id: number, data: Partial<ITodo>): Promise<ITodo | null> {
		const { id: _, ...updateData } = data;
		return prisma.todo.update({
			where: { id },
			data: {
				...updateData,
				status: updateData.status as Status
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