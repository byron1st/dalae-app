import { getAuth } from 'firebase-admin/auth';
import { dev } from '$app/environment';
import app from '$lib/database/firebase.server';
import { SESSION_COOKIE_NAME, SESSION_EXPIRES_IN } from '$lib/cookie.server';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { handleError } from '$lib/api.server';

export const POST = (async ({ request, cookies }) => {
	try {
		const { idToken } = await request.json();

		const sessionCookie = await getAuth(app).createSessionCookie(idToken, {
			expiresIn: SESSION_EXPIRES_IN
		});
		cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
			maxAge: SESSION_EXPIRES_IN,
			httpOnly: true,
			secure: !dev,
			path: '/'
		});

		return json({ success: true });
	} catch (err) {
		throw handleError(err);
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ cookies }) => {
	try {
		cookies.delete(SESSION_COOKIE_NAME, { path: '/' });

		return json({ success: true });
	} catch (err) {
		throw handleError(err);
	}
}) satisfies RequestHandler;
