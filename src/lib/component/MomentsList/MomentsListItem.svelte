<script lang="ts">
	import type { Moment } from '$lib/dto/moment';
	import MomentDateText from '$lib/component/core/MomentDateText.svelte';
	import Tag from '$lib/component/core/Tag.svelte';
	import TextButton from '$lib/component/core/TextButton.svelte';

	export let moment: Moment;
	let hovered: boolean = false;

	function confirmDelete() {
		const confirmed = confirm('Are you sure you want to delete?');
		if (confirmed) {
			console.log('deleted!');
		}
	}
</script>

<div
	class="flex w-full max-w-xs flex-col rounded p-2 transition hover:bg-gray-100"
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
>
	<div class="flex w-full items-center justify-between">
		<MomentDateText date={moment.date} />

		{#if hovered}<TextButton text="delete" variant="warning" onClick={confirmDelete} />{/if}
	</div>

	<p>{moment.text}</p>

	<div class="flex flex-wrap">
		{#each moment.tags as tag}
			<Tag {tag} />
		{/each}
	</div>
</div>
