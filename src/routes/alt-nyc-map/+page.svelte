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
		/* background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path stroke="%230070bb" fill="%230070bb" stroke-width=".5" d="M 2 10 A 3 3 0 0 1 8 5 A 2 2 0 0 0 5 10" /></svg>');
		background-position: top left;
		background-size: 500px 500px; */
		padding: 0;
		height: 100%;
	}
	:global(html:has(.nyc)) {
		height: 100vh;
		overflow: hidden;
	}
</style>
