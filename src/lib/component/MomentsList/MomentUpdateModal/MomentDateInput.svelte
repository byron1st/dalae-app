<script lang="ts">
	export let value: string;
</script>

<div class="flex items-center">
	<div class="flex h-7 w-7 items-center justify-center">
		<i class="fa-solid fa-calendar-days fa-xs text-slate-800 hover:text-slate-900" />
	</div>

	<input
		class="rounded border border-white px-2 py-1 text-xs outline-none transition focus:border-blue-400"
		type="datetime-local"
		bind:value
	/>
</div>
