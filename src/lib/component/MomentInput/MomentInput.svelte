<script lang="ts">
	import { getContext } from 'svelte';
	import dayjs from 'dayjs';
	import { momentsStoresKey, type MomentsStoresType } from '$lib/store/moments';
	import Button from '$lib/component/core/Button.svelte';
	import Tag from '$lib/component/core/Tag.svelte';
	import TextArea from '$lib/component/core/TextArea.svelte';
	import MomentDateText from '$lib/component/core/MomentDateText.svelte';
	import DateSelectTool from '$lib/component/MomentInput/DateSelectTool.svelte';
	import TagSelectTool from '$lib/component/MomentInput/TagSelectTool.svelte';

	let text = '';
	let dateText = '';
	let tags: string[] = [];
	let error = '';

	function reset() {
		text = '';
		dateText = '';
		tags = [];
		error = '';
	}

	const { mutations } = getContext<MomentsStoresType>(momentsStoresKey);
	const mutation = mutations.create;

	function onClick() {
		if (!text || !text.trim()) {
			error = 'empty text';
			return undefined;
		}

		const date = dateText ? dayjs(dateText).valueOf() : dayjs().valueOf();
		if (Number.isNaN(date)) {
			console.error('date: wrong format');
			return undefined;
		}

		if (!Array.isArray(tags)) {
			console.error('tags: not an array');
			return undefined;
		}

		$mutation.mutate({ text, date, tags });
		reset();
	}
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xs flex-col gap-2 px-2">
		<TextArea bind:value={text} bind:error />

		{#if dateText || tags.length > 0}
			<div class="flex w-full flex-col gap-2">
				{#if dateText}
					<MomentDateText date={dayjs(dateText).valueOf()} />
				{/if}

				{#if tags.length > 0}
					<div class="flex flex-wrap">
						{#each tags as tag}
							<Tag {tag} />
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<div class="flex w-full flex-col">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<DateSelectTool bind:dateText />
					<TagSelectTool bind:tags />
					<!-- TODO: User Check Tool -->
				</div>

				<div class="flex items-center gap-2">
					<!-- TODO: isPublic Selection
						<div id="public-selection-container" class="flex items-center">
						<input id="public-selection" type="checkbox" />
						<label for="public-selection">Public</label>
					</div> -->
					<Button text="Record" variant="primary" {onClick} />
				</div>
			</div>

			{#if error}
				<div class="flex w-full justify-end text-xs text-red-800">
					{error}
				</div>
			{/if}
		</div>
	</div>
</div>
