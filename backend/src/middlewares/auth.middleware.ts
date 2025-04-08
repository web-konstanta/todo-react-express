import HttpError from "../expection/http.error"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JwtUserPayload } from "../interfaces/jwt.interface";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw HttpError.unauthorized();
		}

		const token = authHeader.split(' ')[1];
		if (!token) {
			throw HttpError.unauthorized();
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserPayload;
		if (!decoded || !decoded.id || !decoded.email) {
			throw HttpError.unauthorized();
		}

		req.user = decoded;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			next(HttpError.unauthorized());
			return;
		}
		next(error);
	}
}