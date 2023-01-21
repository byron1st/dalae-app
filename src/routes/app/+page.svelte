<script lang="ts">
	import Account from '$lib/component/Account/Account.svelte';
	import MomentInput from '$lib/component/MomentInput/MomentInput.svelte';
	import MomentsList from '$lib/component/MomentsList/MomentsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex w-full flex-col gap-8">
	<Account />

	<main class="flex flex-col gap-12">
		<MomentInput />
		<MomentsList moments={data.moments} />
	</main>
</div>
