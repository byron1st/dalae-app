import type { Handle } from '@sveltejs/kit';
import '$lib/database/firebase.server';
import { SESSION_COOKIE_NAME } from '$lib/cookie.server';
import { getAuth } from 'firebase-admin/auth';
import app from '$lib/database/firebase.server';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);
	if (sessionCookie) {
		try {
			const { uid } = await getAuth(app).verifySessionCookie(sessionCookie);
			event.locals.uid = uid;
		} catch (err) {
			event.cookies.delete(SESSION_COOKIE_NAME);
		}
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;
