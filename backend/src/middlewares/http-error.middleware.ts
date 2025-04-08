import HttpError from "../expection/http.error"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

export const httpErrorMiddleware: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof HttpError) {
		res.status(err.statusCode).json({
			message: err.message,
			body: err.body
		});
		return;
	}

	res.status(500).json({
		message: 'Unprocessable error',
		body: []
	});
}