<script lang="ts">
	import IconButton from '$lib/component/core/IconButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let preventCloseFromOverlayClick: boolean = false;

	const dispatch = createEventDispatcher();

	function close() {
		document.body.className = document.body.className.replace('disable-scrolling', '');
		dispatch('close');
	}

	$: document.body.className += 'disable-scrolling';
</script>

<div
	class="fixed top-0 left-0 h-full w-full bg-black/30"
	on:click={!preventCloseFromOverlayClick ? close : null}
	on:keydown|preventDefault
/>

<div
	class="absolute top-1/2 left-1/2 flex h-full w-full max-w-lg -translate-y-1/2 -translate-x-1/2 flex-col overflow-auto rounded bg-white px-4 sm:h-fit sm:max-h-screen"
>
	<div class="flex h-12 flex-shrink-0 items-center justify-between">
		<div class="text-lg font-bold">{title}</div>

		<IconButton icon="xmark" onClick={close} />
	</div>

	<div class="flex-1">
		<slot />
	</div>

	{#if $$slots.footer}
		<div class="h-12 flex-shrink-0">
			<slot name="footer" {close} />
		</div>
	{/if}
</div>
