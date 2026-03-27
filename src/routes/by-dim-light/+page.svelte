<script lang="ts">
	import { onMount } from "svelte";

	let holder: HTMLElement | undefined = $state();
	let overlay = $state();
	let moveX = $state();
	let moveY = $state();
	let midPoint: number[];
	onMount(() => {
		if (!holder) {
			return;
		}
		const holderDim = holder.getBoundingClientRect();
		midPoint = [holderDim.x + holder.offsetWidth / 2, holderDim.y + holder.offsetHeight / 2];
	});
	function moveLight(ev: MouseEvent) {
		moveX = ev.clientX - midPoint[0];
		moveY = ev.clientY - midPoint[1];
	}
</script>

<svelte:head><title>By Dim Light...</title></svelte:head>

<div id="container" class="dim" bind:this={holder}>
	<img width="1920" height="2194" src="/azathoth.jpg" alt="azathoth" />
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		style={`transform: translate(${moveX}px, ${moveY}px)`}
		id="overlay"
		bind:this={overlay}
		onmousemove={moveLight}
	></div>
</div>

<style>
	:global(body:has(.dim)) {
		background: black;
		overflow: hidden;
	}
	#container {
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		width: max-content;
		cursor: none;
	}
	img {
		width: auto;
		height: 100vh;
		transform: scale(1);
		animation: pulse 2s infinite alternate;
	}
	#overlay {
		width: 300%;
		height: 300%;
		position: absolute;
		top: -100%;
		left: -100%;
		background-color: transparent;
		background: radial-gradient(circle, transparent, 2%, black 8%, black);
		animation: flicker 1s infinite alternate;
	}
	@keyframes flicker {
		to {
			background-color: #00000066;
		}
	}
	@keyframes pulse {
		to {
			transform: scale(1.05);
		}
	}
</style>
