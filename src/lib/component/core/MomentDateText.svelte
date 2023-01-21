<script lang="ts">
	import dayjs from 'dayjs';

	export let date: number;
</script>

<div class="text-xs text-slate-800">
	{dayjs(date).format('YYYY/MM/DD HH:mm')}
</div>
