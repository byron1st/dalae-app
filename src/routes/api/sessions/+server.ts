import { getAuth } from 'firebase-admin/auth';
import { dev } from '$app/environment';
import app from '$lib/firebase/auth.server';
import { SESSION_COOKIE_NAME, SESSION_EXPIRES_IN } from '$lib/cookie.server';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, cookies }) => {
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

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;

export const DELETE = (async ({ cookies }) => {
	cookies.delete(SESSION_COOKIE_NAME, { path: '/' });

	return new Response();
}) satisfies RequestHandler;
