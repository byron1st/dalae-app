<script lang="ts">
	import { onMount } from 'svelte';
	import { s } from '$lib/store/script';
	import Button from '$lib/component/core/Button.svelte';
	import IconButton from '$lib/component/core/IconButton.svelte';
	import Modal from '$lib/component/core/Modal.svelte';
	import Tag from '$lib/component/core/Tag.svelte';

	export let tags: string[];
	let currentTags: string[];
	let value: string;
	let show: boolean = false;

	function toggle() {
		show = !show;
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			currentTags = Array.from(new Set([...currentTags, value]));
			value = '';
		}
	}

	function removeTag(index: number) {
		currentTags = [...currentTags.slice(0, index), ...currentTags.slice(index + 1)];
	}

	function cancel() {
		currentTags = tags;
		value = '';
		toggle();
	}

	function update() {
		tags = currentTags;
		value = '';
		toggle();
	}

	onMount(() => {
		if (!currentTags) {
			currentTags = tags;
		}
	});
</script>

<IconButton icon="tags" onClick={toggle} />

{#if show}
	<Modal on:close={toggle} title={$s['momentinput.tag.modal.header']}>
		<div class="flex flex-wrap">
			{#each currentTags as tag, index}
				<Tag {tag} on:remove={() => removeTag(index)} />
			{/each}
		</div>

		<input
			class="w-full rounded border border-gray-400 px-4 py-2 outline-none transition focus:border-blue-400"
			type="text"
			placeholder={$s['momentinput.tag.input']}
			bind:value
			on:keydown={onKeyDown}
		/>

		<div class="flex h-full w-full items-center justify-end gap-2" slot="footer">
			<Button text={$s.cancel} onClick={cancel} />
			<Button text={$s.update} variant="primary" onClick={update} />
		</div>
	</Modal>
{/if}
