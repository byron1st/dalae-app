<script lang="ts">
	import { setContext } from 'svelte';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { createMomentsStores, momentsStoresKey } from '$lib/store/moments';
	import Account from '$lib/component/Account/Account.svelte';
	import MomentInput from '$lib/component/MomentInput/MomentInput.svelte';
	import MomentsList from '$lib/component/MomentsList/MomentsList.svelte';

	const client = useQueryClient();
	setContext(momentsStoresKey, createMomentsStores(client));
</script>

<div class="flex w-full flex-col gap-8">
	<Account />

	<main class="flex flex-col gap-12">
		<MomentInput />
		<MomentsList />
	</main>
</div>
