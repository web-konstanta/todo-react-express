import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/lib';
import AuthService from '../services/auth.service';
import HttpError from '../expection/http.error';

class AuthController {
	public static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw HttpError.validationError(errors.array());
			}

			const { email, password } = req.body;

			const data = await AuthService.signIn({ email, password });
			
			res.status(201).json(data)
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;