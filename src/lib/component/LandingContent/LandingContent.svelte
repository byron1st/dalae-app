<script>
	import { signInWithPopup, GoogleAuthProvider, getIdToken } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database/firebase';
	import Button from '$lib/component/core/Button.svelte';
	import userStore from '$lib/store/user';

	const provider = new GoogleAuthProvider();

	async function showSignInPopup() {
		if (!auth) return;

		await signInWithPopup(auth, provider);
	}

	function gotoApp() {
		goto('/app');
	}
</script>

<div class="flex justify-center">
	{#if $userStore?.email}
		<Button text="Go to the App" onClick={gotoApp} />
	{:else}
		<Button text="Sign In" onClick={showSignInPopup} />
	{/if}
</div>
