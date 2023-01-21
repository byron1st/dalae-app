/* eslint-disable @typescript-eslint/ban-ts-comment */
import { initializeApp } from 'firebase-admin';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { App } from 'firebase-admin/app';

let app: App;

if (dev) {
	// @ts-ignore
	if (!global.__firebaseAdminApp) {
		app = initializeApp({ projectId: env.GCP_PROJECT_ID });
		// @ts-ignore
		global.__firebaseAdminApp = app;
	}

	// @ts-ignore
	app = global.__firebaseAdminApp;
} else {
	app = initializeApp({ projectId: env.GCP_PROJECT_ID });
}

export default app;
