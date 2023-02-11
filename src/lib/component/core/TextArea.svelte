<script lang="ts">
	import { s } from '$lib/store/script';

	export let value: string;
	export let error: string;
	export let fixedRows: number | undefined = undefined;

	let textArea: HTMLTextAreaElement;

	$: {
		if (textArea && !fixedRows) {
			if (!value) textArea.style.height = '42px';
			else {
				textArea.style.height = '0';
				textArea.style.height = textArea.scrollHeight + 2 + 'px';

				error = '';
			}
		}
	}
</script>

<textarea
	class="h-full w-full resize-none rounded border border-gray-400 px-4 py-2 outline-none transition focus:border-blue-400"
	placeholder={$s['momentinput.textarea.placeholder']}
	rows={fixedRows}
	bind:this={textArea}
	bind:value
/>
