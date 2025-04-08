import { $private } from './axios';
import { Todo } from '../types';

export const TodoService = {
	async getAll(): Promise<Todo[]> {
		const { data } = await $private.get<Todo[]>('/todo');
		return data;
	},

	async create(todo: Omit<Todo, 'id'>): Promise<Todo> {
		const { data } = await $private.post<Todo>('/todo', todo);
		return data;
	},

	async update(id: number, todo: Partial<Todo>): Promise<Todo> {
		const { data } = await $private.put<Todo>(`/todo/${id}`, todo);
		return data;
	},

	async delete(id: number): Promise<void> {
		await $private.delete(`/todo/${id}`);
	}
}; 