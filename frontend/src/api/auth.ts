import { $auth } from './axios';
import { User } from '../types';

export interface AuthResponse {
	accessToken: string;
	user: User;
}

export interface LoginData {
	email: string;
	password: string;
}

export const AuthService = {
	async login(data: LoginData): Promise<AuthResponse> {
		const { data: response } = await $auth.post<AuthResponse>('/auth/sign-in', data);
		console.log(response);

		localStorage.setItem('token', response.accessToken);
		localStorage.setItem('user', JSON.stringify(response.user));
		return response;
	},

	async register(data: LoginData): Promise<AuthResponse> {
		const { data: response } = await $auth.post<AuthResponse>('/auth/sign-up', data);
		localStorage.setItem('token', response.accessToken);
		localStorage.setItem('user', JSON.stringify(response.user));
		return response;
	},

	logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	},

	getToken(): string | null {
		return localStorage.getItem('token');
	},

	getUser(): User | null {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	}
};