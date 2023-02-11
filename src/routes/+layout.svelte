<script>
	import { onMount } from 'svelte';
	import { getIdToken, onAuthStateChanged } from 'firebase/auth';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser, dev } from '$app/environment';
	import { create, remove } from '$lib/api';
	import { auth } from '$lib/database/firebase';
	import userStore from '$lib/store/user';
	import { initLocale } from '$lib/store/locale';
	import 'dayjs/locale/ko';
	import '../app.css';

	initLocale();
	dayjs.extend(relativeTime);
	dayjs.extend(localizedFormat);

	const queryClient = new QueryClient({
		defaultOptions: { queries: { enabled: browser, refetchOnWindowFocus: dev } }
	});

	onMount(() => {
		if (!auth) return;

		onAuthStateChanged(auth, async (user) => {
			userStore.set(user);

			if (user === null) await remove('/api/sessions');
			else {
				const idToken = await getIdToken(user);
				await create('/api/sessions', { idToken });
			}
		});
	});
</script>

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen w-screen text-slate-900">
		<slot />
	</div>
</QueryClientProvider>
