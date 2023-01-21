<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/auth';
	import userStore from '$lib/store/user';
	import Modal from '$lib/component/core/Modal.svelte';
	import Button from '$lib/component/core/Button.svelte';

	const dispatch = createEventDispatcher();

	function toggleProfileModal() {
		dispatch('close');
	}

	async function signOutUser() {
		if (auth) {
			await signOut(auth);
			await fetch('/api/sessions', { method: 'DELETE' });

			toggleProfileModal();
			goto('/');
		}
	}
</script>

<Modal title="Profile" on:close={toggleProfileModal}>
	<div class="flex w-full flex-col">
		<label for="user-email" class="text-xs">Email</label>
		<input id="user-email" type="text" readonly value={$userStore?.email} />
	</div>
	<div class="flex h-full items-center justify-end" slot="footer">
		<Button text="Sign Out" onClick={signOutUser} />
	</div>
</Modal>
