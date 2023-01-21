<script lang="ts">
	export let icon: string;
	export let onClick: () => void;
</script>

<button
	class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 transition hover:bg-gray-100 active:bg-gray-200"
	on:click={onClick}
>
	<i class="fa-solid fa-{icon} fa-sm text-slate-800 hover:text-slate-900" />
</button>
