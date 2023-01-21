<script lang="ts">
	export let value: string;

	function onInput(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		e.currentTarget.style.height = '0';
		e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';
	}
</script>

<textarea
	class="resize-none rounded border border-gray-400 px-4 py-2 outline-none transition focus:border-blue-400"
	rows="1"
	placeholder="do something..."
	bind:value
	on:input={onInput}
/>
