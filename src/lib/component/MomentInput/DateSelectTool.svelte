<script lang="ts">
	import { s } from '$lib/store/script';
	import Button from '$lib/component/core/Button.svelte';
	import IconButton from '$lib/component/core/IconButton.svelte';
	import Modal from '$lib/component/core/Modal.svelte';

	export let dateText: string;
	let value: string;
	let show: boolean = false;

	function toggle() {
		show = !show;
	}

	function cancel() {
		value = dateText;
		toggle();
	}

	function update() {
		dateText = value;
		toggle();
	}
</script>

<IconButton icon="calendar-days" onClick={toggle} />

{#if show}
	<Modal on:close={toggle} title={$s['momentinput.date.modal.header']}>
		<input
			class="w-full rounded border border-gray-400 px-4 py-2 outline-none transition focus:border-blue-400"
			type="datetime-local"
			bind:value
		/>

		<div class="flex h-full w-full items-center justify-end gap-2" slot="footer">
			<Button text={$s.cancel} onClick={cancel} />
			<Button text={$s.update} variant="primary" onClick={update} />
		</div>
	</Modal>
{/if}
