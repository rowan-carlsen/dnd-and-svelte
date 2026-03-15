<script lang="ts">
	import BaseMap from "$lib/BaseMap.svelte";
</script>

<main>
	<BaseMap />
</main>

<style>
	main {
		position: relative;
		width: 100%;
		height: 100%;
	}
	:global(body) {
		background-color: #00008baa;
		padding: 0;
		height: 100%;
	}
	:global(html) {
		height: 100vh;
		overflow: hidden;
	}
</style>
