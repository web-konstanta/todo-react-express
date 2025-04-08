export type Todo = {
	id: number;
	title: string;
	description: string;
	status: TodoStatus;
}

export enum TodoStatus {
	TODO = "TODO",
	IN_PROGRESS = "IN_PROGRESS",
	DONE = "DONE",
}