import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { dev, browser } from '$app/environment';
import {
	PUBLIC_API_KEY,
	PUBLIC_AUTH_DOMAIN,
	PUBLIC_PROJECT_ID,
	PUBLIC_STORAGE_BUCKET,
	PUBLIC_MESSAGING_SENDER_ID,
	PUBLIC_APP_ID
} from '$env/static/public';

const firebaseConfig = {
	apiKey: PUBLIC_API_KEY,
	authDomain: PUBLIC_AUTH_DOMAIN,
	projectId: PUBLIC_PROJECT_ID,
	storageBucket: PUBLIC_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
	appId: PUBLIC_APP_ID
};

function getFirebaseAuth(): Auth | undefined {
	if (!browser) return undefined;

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	if (dev) connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

	return auth;
}

export const auth = getFirebaseAuth();
