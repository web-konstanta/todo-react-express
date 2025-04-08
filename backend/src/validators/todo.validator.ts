import { body, param } from "express-validator/lib";

export const createTodoValidator = [
	body('title')
		.notEmpty()
		.withMessage('Title is required')
		.isLength({ max: 100 })
		.withMessage('Title must be less than 100 characters'),
	body('description')
		.notEmpty()
		.withMessage('Description is required')
		.isLength({ max: 100 })
		.withMessage('Description must be less than 1000 characters'),
	body('status')
		.optional()
		.isBoolean()
		.withMessage('Status must be a boolean')
];

export const updateTodoValidator = [
	body('title')
		.notEmpty()
		.withMessage('Title is required')
		.isLength({ max: 100 })
		.withMessage('Title must be less than 100 characters'),
	body('description')
		.notEmpty()
		.withMessage('Description is required')
		.isLength({ max: 100 })
		.withMessage('Description must be less than 1000 characters'),
	body('status')
		.optional()
		.isBoolean()
		.withMessage('Status must be a boolean')
];