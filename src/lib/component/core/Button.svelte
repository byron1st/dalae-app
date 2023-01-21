<script lang="ts">
	export let text: string;
	export let onClick: () => void;
	export let variant: 'default' | 'primary' | 'warning' = 'default';

	const variantClasses =
		variant === 'primary'
			? 'border-blue-400 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 active:bg-blue-200'
			: variant === 'warning'
			? 'border-red-400 bg-red-50 hover:border-red-500 hover:bg-red-100 active:bg-red-200'
			: 'border-gray-400 bg-gray-50 hover:border-gray-500 hover:bg-gray-100 active:bg-gray-200';
</script>

<button class={`"h-6 rounded border px-2 text-sm transition ${variantClasses}`} on:click={onClick}
	>{text}</button
>
