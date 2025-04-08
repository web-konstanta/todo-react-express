import HttpError from "../expection/http.error"
import { Request, Response, NextFunction } from "express"
import { Role } from "@prisma/client"

export const adminMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.user) {
			throw HttpError.unauthorized();
		}

		if (req.user.role !== Role.ADMIN) {
			throw HttpError.forbidden(403, 'Access denied. Admin role required.');
		}

		next();
	} catch (error) {
		next(error);
	}
}