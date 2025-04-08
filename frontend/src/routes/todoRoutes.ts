import Index from "../pages/Todo/Index";
import EditTodo from "../pages/Todo/EditTodo";

export const todoRoutes = [
	{
		path: '/todo',
		component: Index,
		exact: true
	},
	{
		path: '/todo/:id',
		component: EditTodo,
		exact: true
	},
]
