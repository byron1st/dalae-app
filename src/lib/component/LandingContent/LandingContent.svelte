<script>
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database/firebase';
	import userStore from '$lib/store/user';
	import { s } from '$lib/store/script';
	import Button from '$lib/component/core/Button.svelte';

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
		<Button text={$s['landingpage.gotoapp']} onClick={gotoApp} />
	{:else}
		<Button text={$s.signin} onClick={showSignInPopup} />
	{/if}
</div>
