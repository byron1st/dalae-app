<script lang="ts">
	import type { Moment } from '$lib/dto/moment';
	import MomentsListItem from '$lib/component/MomentsList/MomentsListItem.svelte';

	export let moments: Moment[];
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col gap-2">
		{#each moments as moment, index}
			<MomentsListItem {moment} />
			{#if index !== moments.length - 1}<hr />{/if}
		{/each}
	</div>
</div>
