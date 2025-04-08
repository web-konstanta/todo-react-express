import { ITodo } from "../interfaces/todo.interface";
import prisma from "../lib/prisma";

class TodoService {
	public static async getAllTodos(): Promise<ITodo[]> {
		return prisma.todo.findMany();
	}

	public static async getTodoById(id: number): Promise<ITodo | null> {
		return prisma.todo.findUnique({ where: { id } });
	}
}

export default TodoService;