import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { dev, browser } from '$app/environment';
import { env } from '$env/dynamic/public';

const firebaseConfig = {
	apiKey: env.PUBLIC_API_KEY,
	authDomain: env.PUBLIC_AUTH_DOMAIN,
	projectId: env.PUBLIC_PROJECT_ID,
	storageBucket: env.PUBLIC_STORAGE_BUCKET,
	messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
	appId: env.PUBLIC_APP_ID
};

function getFirebaseAuth(): Auth | undefined {
	if (!browser) return undefined;

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	if (dev) connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

	return auth;
}

export const auth = getFirebaseAuth();
