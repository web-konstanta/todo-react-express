import { $auth } from './axios';

export interface AuthResponse {
	accessToken: string;
	user: {
		id: number;
		email: string;
	};
}

export interface LoginData {
	email: string;
	password: string;
}

export const AuthService = {
	async login(data: LoginData): Promise<AuthResponse> {
		const { data: response } = await $auth.post<AuthResponse>('/auth/sign-in', data);

		localStorage.setItem('token', response.accessToken);
		return response;
	},

	async register(data: LoginData): Promise<AuthResponse> {
		const { data: response } = await $auth.post<AuthResponse>('/auth/sign-up', data);
		localStorage.setItem('token', response.accessToken);
		return response;
	},

	logout(): void {
		localStorage.removeItem('token');
	},

	getToken(): string | null {
		return localStorage.getItem('token');
	}
};