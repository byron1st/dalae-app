import queryString from 'query-string';
import { dev } from '$app/environment';

export type DefaultSuccessResult = { success: boolean };

type ErrorResult = { message: string };

export function create<T, K>(path: string, options?: K): Promise<T> {
	return callAPI<T, K>(path, 'POST', options);
}

export function read<T, K>(path: string, options?: K): Promise<T> {
	return callAPI<T, K>(
		options ? encodeURI(queryString.stringifyUrl({ url: path, query: options })) : path
	);
}

export function update<T, K>(path: string, options?: K): Promise<T> {
	return callAPI<T, K>(path, 'PUT', options);
}

export function remove<T, K>(path: string, options?: K): Promise<T> {
	return callAPI<T, K>(path, 'DELETE', options);
}

async function callAPI<T, K>(
	url: string,
	method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET',
	body?: K
): Promise<T> {
	const result = await fetch(url, {
		method,
		headers: method !== 'GET' ? { 'content-type': 'application/json' } : undefined,
		body: body ? JSON.stringify(body) : undefined
	});

	const response: T | ErrorResult = await result.json();

	if (dev) {
		console.log({ method, url, request: body ?? undefined, status: result.status, response });
	}

	if (isErrorResult(response, result)) throw new Error(response.message);
	return response;
}

function isErrorResult<T>(_response: T | ErrorResult, result: Response): _response is ErrorResult {
	return !result.ok;
}
