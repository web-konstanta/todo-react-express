class HttpError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
		public body?: any
	) {
		super(message);
	}

	public static validationError(body?: any): HttpError {
		return new HttpError(422, 'Validation failed', body);
	}

	public static unauthorized(): HttpError {
		return new HttpError(401, 'Unauthorized');
	}

	public static badRequest(statusCode: number, message: string): HttpError {
		return new HttpError(statusCode, message);
	}

	public static forbidden(statusCode: number = 403, message: string = 'Forbidden'): HttpError {
		return new HttpError(statusCode, message);
	}
}

export default HttpError;
