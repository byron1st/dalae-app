<script lang="ts">
	import IconButton from '$lib/component/core/IconButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
</script>

<div
	class="fixed top-0 left-0 h-full w-full bg-black/30"
	on:click={close}
	on:keydown|preventDefault
/>

<div
	class="modal-size fixed top-1/2 left-1/2 max-w-lg -translate-y-1/2 -translate-x-1/2 overflow-auto rounded bg-white px-4"
>
	<div class="flex h-12 items-center justify-between">
		<div class="text-lg font-bold">{title}</div>

		<IconButton icon="xmark" onClick={close} />
	</div>

	<slot />

	{#if $$slots.footer}
		<div class="h-12">
			<slot name="footer" />
		</div>
	{/if}
</div>

<style>
	.modal-size {
		width: calc(100vw - 4rem);
		max-height: calc(100vh - 4em);
	}
</style>
