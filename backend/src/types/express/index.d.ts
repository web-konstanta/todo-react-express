import { JwtUserPayload } from "../../interfaces/jwt.interface";

declare global {
	namespace Express {
		interface Request {
			user?: JwtUserPayload;
		}
	}
}