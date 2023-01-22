/* eslint-disable @typescript-eslint/ban-ts-comment */
import firebaseAdmin from 'firebase-admin';
import { dev } from '$app/environment';
import { GCP_PROJECT_ID, GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY } from '$env/static/private';
import type { App } from 'firebase-admin/app';

let app: App;

if (dev) {
	// @ts-ignore
	if (!global.__firebaseAdminApp) {
		app = firebaseAdmin.initializeApp({ projectId: GCP_PROJECT_ID });
		// @ts-ignore
		global.__firebaseAdminApp = app;
	}

	// @ts-ignore
	app = global.__firebaseAdminApp;
} else {
	app = firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			projectId: GCP_PROJECT_ID,
			clientEmail: GCP_CLIENT_EMAIL,
			privateKey: GCP_PRIVATE_KEY
		})
	});
}

export default app;
