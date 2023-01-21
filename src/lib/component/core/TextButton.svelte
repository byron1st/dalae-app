<script lang="ts">
	export let text: string;
	export let onClick: () => void | Promise<void>;
	export let variant: 'default' | 'primary' | 'warning' = 'default';

	const variantClasses =
		variant === 'primary'
			? 'text-blue-800'
			: variant === 'warning'
			? 'text-red-800'
			: 'text-slate-800';
</script>

<button class={`text-xs ${variantClasses}`} on:click={onClick}
	>(<span class="underline">{text}</span>)</button
>
