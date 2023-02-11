<script lang="ts">
	import dayjs from 'dayjs';
	import { locale } from '$lib/store/locale';

	export let date: number;

	const week = 1000 * 60 * 60 * 24 * 7;
	$: dateStr =
		dayjs().valueOf() - date <= week
			? dayjs(date).locale($locale).fromNow()
			: dayjs(date).locale($locale).format('LLL');
</script>

<div class="text-xs text-slate-800">
	{dateStr}
</div>
