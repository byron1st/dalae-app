import { redirect } from '@sveltejs/kit';
import { getAuth } from 'firebase-admin/auth';
import app from '$lib/database/firebase.server';
import { SESSION_COOKIE_NAME } from '$lib/cookie.server';
import type { PageServerLoad } from './$types';

export const load = (async ({ request, cookies, locals }) => {
	const url = new URL(request.url);
	if (url.pathname.startsWith('/app') && !locals.uid) {
		const sessionCookie = cookies.get(SESSION_COOKIE_NAME);
		if (!sessionCookie) throw redirect(302, '/');

		try {
			await getAuth(app).verifySessionCookie(sessionCookie);
		} catch (err) {
			cookies.delete(SESSION_COOKIE_NAME);
			throw redirect(302, '/');
		}
	}
}) satisfies PageServerLoad;
