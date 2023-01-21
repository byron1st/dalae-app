<script>
	import { signInWithPopup, GoogleAuthProvider, getIdToken } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/auth';
	import Button from '$lib/component/core/Button.svelte';
	import userStore from '$lib/store/user';

	const provider = new GoogleAuthProvider();

	async function showSignInPopup() {
		if (auth) {
			const result = await signInWithPopup(auth, provider);
			if (result.user) {
				const idToken = await getIdToken(result.user);
				const response = await fetch('/api/sessions', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ idToken })
				});

				if (response.ok) goto('/app');
			}
		}
	}

	function gotoApp() {
		goto('/app');
	}
</script>

<div class="flex justify-center">
	{#if $userStore?.email}
		<Button text="Start" onClick={gotoApp} />
	{:else}
		<Button text="Sign In" onClick={showSignInPopup} />
	{/if}
</div>
