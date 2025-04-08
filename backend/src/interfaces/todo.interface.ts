import { Status } from "@prisma/client";

export interface ITodo {
	id: number;
	title: string;
	description: string;
	status: Status | null;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateTodoDto {
	title: string;
	description: string;
}

export interface IUpdateTodoDto {
	title?: string;
	description?: string;
	status?: string;
}