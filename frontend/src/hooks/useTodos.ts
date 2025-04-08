import { useState, useContext } from 'react';
import { TodoService } from '../api/todo';
import { Todo } from '../types';
import { AuthContext } from '../context';
import { UserRole } from '../types';

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user } = useContext(AuthContext);

	const fetchTodos = async () => {
		try {
			setLoading(true);
			const data = user?.role === UserRole.ADMIN
				? await TodoService.getAllAdmin()
				: await TodoService.getAll();
			setTodos(data);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to fetch todos");
		} finally {
			setLoading(false);
		}
	};

	return {
		todos,
		setTodos,
		loading,
		setLoading,
		error,
		setError,
		fetchTodos
	};
}; 