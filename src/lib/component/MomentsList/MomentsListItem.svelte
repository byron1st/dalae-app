<script lang="ts">
	import type { MomentDTO } from '$lib/dto/moment';
	import MomentDateText from '$lib/component/core/MomentDateText.svelte';
	import Tag from '$lib/component/core/Tag.svelte';
	import TextButton from '$lib/component/core/TextButton.svelte';
	import MomentUpdateModal from '$lib/component/MomentsList/MomentUpdateModal/MomentUpdateModal.svelte';

	export let moment: MomentDTO;
	let hovered: boolean = false;
	let modal: boolean = false;

	function toggleModal() {
		modal = !modal;
	}
</script>

<article
	class="flex w-full max-w-xs flex-col rounded p-2 transition hover:bg-gray-100"
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
>
	<div class="flex w-full items-center justify-between">
		<MomentDateText date={moment.date} />

		{#if hovered}<TextButton text="update" onClick={toggleModal} />{/if}
	</div>

	<div>
		{#each moment.text.split('\n') as paragraph}
			{#if paragraph}
				<p>{paragraph}</p>
			{:else}
				<p class="h-4" />
			{/if}
		{/each}
	</div>

	<div class="flex flex-wrap">
		{#each moment.tags as tag}
			<Tag {tag} />
		{/each}
	</div>
</article>
<hr />

{#if modal}<MomentUpdateModal on:close={toggleModal} {moment} />{/if}
