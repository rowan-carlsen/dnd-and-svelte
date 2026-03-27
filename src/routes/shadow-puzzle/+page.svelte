<script lang="ts">
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
</script>

<svelte:head><title>Shadow Puzzle</title></svelte:head>

<Canvas>
	<Scene />
</Canvas>
<div class="shadow"></div>

<style>
	:global(body:has(.shadow)) {
		background-color: #33101c;
	}
</style>
