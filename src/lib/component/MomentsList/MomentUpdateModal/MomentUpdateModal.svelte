<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import dayjs from 'dayjs';
	import type { MomentDTO } from '$lib/dto/moment';
	import { momentsStoresKey, type MomentsStoresType } from '$lib/store/moments';
	import { s } from '$lib/store/script';
	import Modal from '$lib/component/core/Modal.svelte';
	import Button from '$lib/component/core/Button.svelte';
	import TextArea from '$lib/component/core/TextArea.svelte';
	import MomentDateInput from '$lib/component/MomentsList/MomentUpdateModal/MomentDateInput.svelte';
	import MomentTagInput from '$lib/component/MomentsList/MomentUpdateModal/MomentTagInput.svelte';

	export let moment: MomentDTO;
	let text = '';
	let dateText = '';
	let tags: string[] = [];
	let error = '';

	const dispatch = createEventDispatcher();

	const { mutations } = getContext<MomentsStoresType>(momentsStoresKey);
	const updateMutation = mutations.update;
	const deleteMutation = mutations.delete;

	async function confirmDelete(): Promise<boolean> {
		const confirmed = confirm('Are you sure you want to delete?');
		if (!confirmed) return false;

		$deleteMutation.mutate({ id: moment.id });
		return true;
	}

	async function updateMoment(): Promise<void> {
		if (!text || !text.trim()) {
			error = $s['momentinput.error.emptytext'];
			return;
		}

		const date = dateText ? dayjs(dateText).valueOf() : dayjs().valueOf();
		if (Number.isNaN(date)) {
			console.error('date: wrong format');
			return;
		}

		if (!Array.isArray(tags)) {
			console.error('tags: not an array');
			return;
		}

		$updateMutation.mutate({ id: moment.id, text, date, tags });
	}

	onMount(() => {
		if (!moment) return;

		text = moment.text;
		tags = moment.tags ?? [];
		dateText = dayjs(moment.date).format('YYYY-MM-DDTHH:mm');
		error = '';
	});
</script>

<Modal
	title={$s['momentupdate.modal.header']}
	on:close={() => dispatch('close')}
	preventCloseFromOverlayClick
>
	<div class="flex h-full w-full flex-col gap-2">
		<div class="flex-1">
			<TextArea bind:value={text} bind:error fixedRows={10} />
		</div>

		<MomentDateInput bind:value={dateText} />
		<MomentTagInput bind:tags />
	</div>

	<div class="flex h-full items-center justify-between" slot="footer" let:close={closeModal}>
		<Button text={$s.cancel} onClick={closeModal} />

		<div class="gap-2">
			<Button
				text={$s.delete}
				variant="warning"
				onClick={async () => {
					const success = await confirmDelete();
					if (success) closeModal();
				}}
			/>
			<Button
				text={$s.update}
				variant="primary"
				onClick={() => {
					updateMoment();
					closeModal();
				}}
			/>
		</div>
	</div>
</Modal>
