import { body } from "express-validator/lib";

export const authValidator = [
	body('email')
		.isEmail()
		.notEmpty()
		.withMessage('Email is required'),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ max: 30 })
		.withMessage('Description must be less than 30 characters'),
];