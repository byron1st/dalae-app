<script lang="ts">
	import { getContext } from 'svelte';
	import { momentsStoresKey, type MomentsStoresType } from '$lib/store/moments';
	import { s } from '$lib/store/script';
	import TextButton from '$lib/component/core/TextButton.svelte';
	import LoadingSpinner from '$lib/component/core/LoadingSpinner.svelte';
	import MomentsListItem from '$lib/component/MomentsList/MomentsListItem.svelte';

	const { data } = getContext<MomentsStoresType>(momentsStoresKey);
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xs flex-col pb-10">
		{#if $data.isLoading}
			<div class="flex w-full items-center justify-center">
				<LoadingSpinner size={6} />
			</div>
		{:else if $data.isError}
			<div class="text-center text-xs text-red-800">{$s['moments.loaderror']}</div>
		{:else if $data.isSuccess}
			{#each $data.data.pages as moments}
				{#each moments as moment}
					<MomentsListItem {moment} />
				{/each}
			{/each}

			{#if $data.hasNextPage}
				<div class="flex justify-center">
					<TextButton
						text={$s['moments.listmore']}
						onClick={() => {
							$data.fetchNextPage();
						}}
					/>
				</div>
			{/if}
		{/if}
	</div>
</div>
