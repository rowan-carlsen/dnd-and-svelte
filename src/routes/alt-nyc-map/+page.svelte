<script lang="ts">
	import BaseMap from "$lib/BaseMap.svelte";
</script>

<svelte:head><title>Not York City</title></svelte:head>

<main class="nyc">
	<BaseMap />
</main>

<style>
	main {
		position: relative;
		width: 100%;
		height: 100%;
	}
	:global(body:has(.nyc)) {
		background-color: #00008baa;
		padding: 0;
		height: 100%;
	}
	:global(html:has(.nyc)) {
		height: 100vh;
		overflow: hidden;
	}
</style>
