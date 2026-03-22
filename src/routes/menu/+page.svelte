<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<nav>
	<ul>
		<li>
			<a data-sveltekit-reload href={resolve("/mudross-remnants")}
				>Mudross Remnants (Map with light hover interactivity)</a
			>
		</li>
		<li>
			<a data-sveltekit-reload href={resolve("/by-dim-light")}
				>By Dim Light (Examine something creepy by torch (or similar) light</a
			>
		</li>
		<li>
			<a data-sveltekit-reload href={resolve("/block-puzzle")}>Block Puzzle (TBD desc)</a>
		</li>
		<li>
			<a data-sveltekit-reload href={resolve("/shadow-puzzle")}>Shadow Puzzle (TBD desc)</a>
		</li>
		<li>
			<a data-sveltekit-reload href={resolve("/mission-briefing")}>Mission Briefing (TBD desc)</a>
		</li>
		<li>
			<a data-sveltekit-reload href={resolve("/alt-nyc-map")}>Alt NYC Map (TBD desc)</a>
		</li>
	</ul>
</nav>

<style>
</style>
