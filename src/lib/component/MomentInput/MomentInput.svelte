<script lang="ts">
	import dayjs from 'dayjs';
	import Button from '$lib/component/core/Button.svelte';
	import Tag from '$lib/component/core/Tag.svelte';
	import DateSelectTool from '$lib/component/MomentInput/DateSelectTool.svelte';
	import TagSelectTool from '$lib/component/MomentInput/TagSelectTool.svelte';
	import Textfield from '$lib/component/MomentInput/Textfield.svelte';
	import MomentDateText from '$lib/component/core/MomentDateText.svelte';

	let text = '';
	let dateText = '';
	let tags: string[] = [];

	function onClick() {
		console.log('text', text);
		console.log('dateText', dateText);
		console.log('tags', tags);
	}
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xs flex-col gap-2 px-2">
		<Textfield bind:value={text} />

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
	</div>
</div>
