<script lang="ts">
	export let text: string;
	export let onClick: () => void | boolean | Promise<void | boolean>;
	export let variant: 'default' | 'primary' | 'warning' = 'default';
</script>

<button
	class="text-xs"
	class:text-blue-800={variant === 'primary'}
	class:hover:text-blue-500={variant === 'primary'}
	class:active:text-blue-300={variant === 'primary'}
	class:text-red-800={variant === 'warning'}
	class:hover:text-red-500={variant === 'warning'}
	class:active:text-red-300={variant === 'warning'}
	class:text-slate-800={variant === 'default'}
	class:hover:text-slate-500={variant === 'default'}
	class:active:text-slate-300={variant === 'default'}
	on:click={onClick}>(<span class="underline">{text}</span>)</button
>
