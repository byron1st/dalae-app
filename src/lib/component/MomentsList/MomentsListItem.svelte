<script lang="ts">
	import type { MomentDTO } from '$lib/dto/moment';
	import MomentDateText from '$lib/component/core/MomentDateText.svelte';
	import Tag from '$lib/component/core/Tag.svelte';
	import TextButton from '$lib/component/core/TextButton.svelte';
	import MomentUpdateModal from '$lib/component/MomentsList/MomentUpdateModal/MomentUpdateModal.svelte';

	export let moment: MomentDTO;
	let hovered: boolean = false;
	let modal: boolean = false;
	let textbox: HTMLDivElement;

	$: isTruncated = textbox ? textbox.scrollHeight !== textbox.clientHeight : false;
</script>

<article
	class="flex w-full max-w-xs flex-col rounded p-2 transition hover:bg-gray-100"
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
>
	<div class="flex w-full items-center justify-between">
		<MomentDateText date={moment.date} />

		{#if hovered}<TextButton text="update" onClick={() => (modal = true)} />{/if}
	</div>

	<div class="ellipsis" bind:this={textbox}>
		{#each moment.text.split('\n') as paragraph}
			{#if paragraph}
				<p>{paragraph}</p>
			{:else}
				<p class="h-4" />
			{/if}
		{/each}
	</div>

	{#if isTruncated}
		<div class="flex w-full flex-row justify-end">
			<TextButton
				text="more"
				onClick={() => {
					textbox.className = textbox.className.replace('ellipsis', '');
				}}
			/>
		</div>
	{/if}

	<div class="flex flex-wrap">
		{#each moment.tags as tag}
			<Tag {tag} />
		{/each}
	</div>
</article>
<hr />

{#if modal}<MomentUpdateModal on:close={() => (modal = false)} {moment} />{/if}

<style>
	.ellipsis {
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
		white-space: pre-wrap;
	}
</style>
