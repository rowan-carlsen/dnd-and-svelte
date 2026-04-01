<script lang="ts">
	import { areaNames, newNames } from "./neighborhood-names.svelte.ts";
	const { targetArea }: { targetArea: HTMLElement | undefined } = $props();
	let areaCode: string | undefined = $derived(targetArea?.dataset.area);
	let position = $derived.by(() => {
		if (!targetArea) {
			return [0, 0];
		}
		const rect = targetArea.getBoundingClientRect();
		return [rect.left, rect.top];
	});
</script>

<div class="tooltip" style={`left: ${position[0]}px; top: ${position[1]}px`}>
	{areaCode ? (newNames[areaCode] ? newNames[areaCode].name : areaNames[areaCode].name) : ""}
</div>

<style>
	.tooltip {
		background: black;
		color: white;
		padding: 0.5rem;
		border-radius: 10rem;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		transform: translate(-50%, calc(-100% - 0.5rem));
	}
	.tooltip:empty {
		display: none;
	}
</style>
