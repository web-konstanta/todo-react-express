import { IUser } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../lib/prisma";
import HttpError from "../expection/http.error";
import bcrypt from "bcrypt";
dotenv.config();

class AuthService {
	public static async signIn(data: Omit<IUser, 'id'>) {
		const candidate = await prisma.user.findUnique({ where: { email: data.email } });
		if (candidate) {
			throw HttpError.badRequest(400, 'User with this email already exists');
		}

		const hashedPassword = await bcrypt.hash(String(data.password), 10);

		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: hashedPassword
			}
		});

		const accessToken = jwt.sign(
			{ email: user.email },
			process.env.JWT_SECRET!,
			{ expiresIn: '1h' }
		);

		return { user, accessToken };
	}
}

export default AuthService;