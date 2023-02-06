<script lang="ts">
	import TextButton from '$lib/component/core/TextButton.svelte';

	export let tag: string;
	export let remove: undefined | (() => void) = undefined;
	export let size: 'xs' | 'sm' = 'sm';
</script>

<div class="mr-2 text-{size} text-blue-800">
	#{tag}
	{#if remove}
		<span>
			<TextButton text="x" variant="primary" onClick={remove} />
		</span>
	{/if}
</div>
