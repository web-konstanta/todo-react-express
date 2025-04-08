import { $private } from './axios';
import { Todo } from '../types';

export const TodoService = {
	async getAllAdmin(): Promise<Todo[]> {
		const { data } = await $private.get('/todo/admin');
		return data.data;
	},

	async getAll(): Promise<Todo[]> {
		const { data } = await $private.get('/todo');
		return data.data;
	},

	async getById(id: number): Promise<Todo> {
		const { data } = await $private.get(`/todo/${id}`);
		return data.data;
	},

	async create(todo: Omit<Todo, 'id'>): Promise<Todo> {
		const { data } = await $private.post('/todo', todo);
		return data;
	},

	async update(id: number, todo: Partial<Todo>): Promise<Todo> {
		const { data } = await $private.put(`/todo/${id}`, todo);
		return data;
	},

	async delete(id: number): Promise<void> {
		await $private.delete(`/todos/${id}`);
	}
};