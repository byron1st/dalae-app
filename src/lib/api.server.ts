import { dev } from '$app/environment';
import { error, type HttpError } from '@sveltejs/kit';

export class APIError extends Error {
	status = 500;

	constructor(status?: number, err?: unknown) {
		super(err instanceof Error ? err.message : 'unknown error');
		this.status = status ?? 500;
	}
}

export function handleError(inputErr: unknown): HttpError {
	if (dev) console.error(inputErr);

	const status = inputErr instanceof APIError ? inputErr.status : 500;
	const message = inputErr instanceof Error ? inputErr.message : 'unknown error';

	return error(status, { message });
}
