export type Todo = {
	id: number;
	title: string;
	description: string;
	status?: TodoStatus;
}

export enum TodoStatus {
	PENDING = "PENDING",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
}

export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN"
}

export type User = {
	id: number;
	email: string;
	role: UserRole;
}