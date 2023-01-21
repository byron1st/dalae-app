<script>
	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import dayjs from 'dayjs';
	import { auth } from '$lib/firebase/auth';
	import userStore from '$lib/store/user';
	import 'dayjs/locale/ko';
	import '../app.css';

	dayjs.locale('ko');

	onMount(() => {
		if (auth) onAuthStateChanged(auth, (user) => userStore.set(user));
	});
</script>

<div class="min-h-screen w-screen text-slate-900">
	<slot />
</div>
