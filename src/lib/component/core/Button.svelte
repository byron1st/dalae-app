<script lang="ts">
	export let text: string;
	export let onClick: () => void;
	export let variant: 'default' | 'primary' | 'warning' = 'default';
</script>

<button
	class="h-6 rounded border px-2 text-sm transition"
	class:border-blue-400={variant === 'primary'}
	class:bg-blue-50={variant === 'primary'}
	class:hover:border-blue-500={variant === 'primary'}
	class:hover:bg-blue-100={variant === 'primary'}
	class:active:bg-blue-200={variant === 'primary'}
	class:border-red-400={variant === 'warning'}
	class:text-red-900={variant === 'warning'}
	class:bg-red-50={variant === 'warning'}
	class:hover:border-red-500={variant === 'warning'}
	class:hover:bg-red-100={variant === 'warning'}
	class:active:bg-red-200={variant === 'warning'}
	class:border-gray-400={variant === 'default'}
	class:bg-gray-50={variant === 'default'}
	class:hover:border-gray-500={variant === 'default'}
	class:hover:bg-gray-100={variant === 'default'}
	class:active:bg-gray-200={variant === 'default'}
	on:click={onClick}
>
	{text}
</button>
