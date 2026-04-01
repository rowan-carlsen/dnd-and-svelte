<script lang="ts">
	import { base } from "$app/paths";
	import favicon from "$lib/assets/favicon.svg";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="{base}/global.css" />
</svelte:head>

{@render children()}
