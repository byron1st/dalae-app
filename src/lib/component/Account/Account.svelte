<script lang="ts">
	import userStore from '$lib/store/user';
	import ProfileModal from '$lib/component/Account/ProfileModal.svelte';

	let profileModalShow: boolean = false;

	function toggleProfileModal() {
		profileModalShow = !profileModalShow;
	}
</script>

<div class="flex h-12 w-full items-center justify-end bg-slate-50 px-2">
	{#if $userStore?.email}
		<button class="flex items-center gap-2" on:click={toggleProfileModal}>
			<div class="text-sm">{$userStore.email}</div>
			{#if $userStore.photoURL}
				<div
					class="h-8 w-8 rounded-full bg-cover bg-center"
					style={`background-image: url("${$userStore.photoURL}")`}
				/>
			{:else}
				<div class="flex h-8 w-8 items-center justify-center rounded-full border">
					<i class="fa-solid fa-user" />
				</div>
			{/if}
		</button>
	{/if}
</div>

{#if profileModalShow}
	<ProfileModal on:close={toggleProfileModal} />
{/if}
