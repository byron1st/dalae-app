<script lang="ts">
	import { s } from '$lib/store/script';
	import Tag from '$lib/component/core/Tag.svelte';

	export let tags: string[] = [];
	let tag = '';

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			tags = Array.from(new Set([...tags, tag]));
			tag = '';
		}
	}

	function removeTag(index: number) {
		tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
	}
</script>

<div class="flex items-center">
	<div class="flex h-7 w-7 items-center justify-center">
		<i class="fa-solid fa-tags fa-xs text-slate-800 hover:text-slate-900" />
	</div>

	<input
		class="rounded border border-white px-2 py-1 text-xs outline-none transition focus:border-blue-400"
		type="text"
		placeholder={$s['momentinput.tag.input']}
		bind:value={tag}
		on:keydown={onKeyDown}
	/>
</div>

{#if tags.length > 0}
	<div class="ml-9 flex h-8 overflow-auto">
		{#each tags as tag, index}
			<div class="flex-shrink-0">
				<Tag {tag} size="xs" remove={() => removeTag(index)} />
			</div>
		{/each}
	</div>
{/if}
