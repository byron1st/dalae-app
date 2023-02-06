<script lang="ts">
	export let text: string;
	export let onClick: () => void | Promise<void>;
	export let variant: 'default' | 'primary' | 'warning' = 'default';
</script>

<button
	class="text-xs"
	class:text-blue-800={variant === 'primary'}
	class:text-red-800={variant === 'warning'}
	class:text-slate-800={variant === 'default'}
	on:click={onClick}>(<span class="underline">{text}</span>)</button
>
