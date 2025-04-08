import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const $auth = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	}
});

export const $private = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('token')}`,
	}
});

$private.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$private.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/sign-in';
		}
		return Promise.reject(error);
	}
);