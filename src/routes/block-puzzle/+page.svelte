<script>
	import { crossfade } from "svelte/transition";
	import { fade } from "svelte/transition";
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === "none" ? "" : style.transform;

			return {
				duration: 600,
				css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
			};
		}
	});
	const blank = { coords: [3, 3], letter: "", blank: true };
	let done = $state(false);
	const grid = $state([
		{
			coords: [1, 3],
			letter: "o"
		},
		{
			coords: [2, 2],
			letter: "p"
		},
		{
			coords: [4, 4],
			letter: "e"
		},
		{
			coords: [3, 1],
			letter: "n"
		},
		{
			coords: [3, 2],
			letter: "d"
		},
		{
			coords: [1, 1],
			letter: "o"
		},
		{
			coords: [4, 2],
			letter: "o"
		},
		{
			coords: [3, 4],
			letter: "r"
		},
		{
			coords: [2, 1],
			letter: ""
		},
		{
			coords: [1, 2],
			letter: ""
		},
		{
			coords: [4, 1],
			letter: ""
		},
		{
			coords: [4, 3],
			letter: ""
		},
		{
			coords: [2, 3],
			letter: ""
		},
		{
			coords: [1, 4],
			letter: ""
		},
		{
			coords: [2, 4],
			letter: ""
		},
		{
			coords: [3, 3],
			letter: "",
			blank: true
		}
	]);

	function canMove(block) {
		return (
			Math.abs(block.coords[0] - blank.coords[0]) + Math.abs(block.coords[1] - blank.coords[1]) ===
			1
		);
	}
	function move(block) {
		if (!done && canMove(block)) {
			[block.coords, blank.coords] = [blank.coords, block.coords];
			checkIfDone();
		}
	}
	function checkIfDone() {
		const result = [];
		for (let y = 1; y < 3; y++) {
			for (let x = 1; x < 5; x++) {
				const letterAt = grid.find((entry) => entry.coords[0] === x && entry.coords[1] === y);
				result.push(letterAt.letter);
			}
		}
		if (result.join("") === "opendoor") {
			done = true;
		}
	}
</script>

<main>
	<h1>Door Puzzle</h1>
	<div id="container">
		{#each grid as block, i (i)}
			{#key block.coords}
				<div
					role="button"
					tabindex="0"
					onclick={() => move(block)}
					onkeydown={(e) => {
						console.log(e.key);
					}}
					class="block"
					class:blank={block.blank}
					style="--xPos: {block.coords[0]}; --yPos: {block.coords[1]}"
					in:receive={{ key: i }}
					out:send={{ key: i }}
				>
					{block.letter}
				</div>
			{/key}
		{/each}
	</div>
	{#if done}
		<h2 in:fade>The door opens...</h2>
	{/if}
</main>

<style>
	:global(html) {
		height: 100%;
	}
	:global(body) {
		min-height: 100%;
		padding: 0;
		margin: 0;
		background-color: #966f33;
		background-image:
			linear-gradient(to right, transparent 95%, black 95%),
			linear-gradient(95deg, #754224, #552204);
		background-repeat: repeat-x;
		background-size: 5em 100%;
		padding-top: 1em;
	}

	h1 {
		margin-top: 0;
		width: max-content;
		background-color: grey;
		padding: 0.25em;
		margin: 0 auto;
		border: 2px solid black;
		border-radius: 0.5em;
	}
	#container {
		width: 20em;
		height: 20em;
		box-sizing: content-box;
		border: 2px solid darkgrey;
		margin: 5em auto 0 auto;
		background: black;
		display: grid;
		grid-template: repeat(4, 5em) / repeat(4, 5em);
		position: relative;
	}
	#container::before,
	#container::after {
		position: absolute;
		width: 5rem;
		height: 5rem;
		font-size: 5em;
		color: gold;
		display: flex;
		justify-content: center;
		align-items: center;
		left: -5rem;
		transform: translateY(-0.1em);
	}
	#container::before {
		content: "\00BB";
		top: 0;
	}
	#container::after {
		content: "\00BB";
		top: 5rem;
	}
	.block {
		border: 2px solid transparent;
		width: 5rem;
		height: 5rem;
		grid-column: var(--xPos);
		grid-row: var(--yPos);
		background-color: grey;
		background-clip: content-box;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 4em;
		position: relative;
		cursor: pointer;
		user-select: none;
	}
	.blank {
		background: transparent;
		z-index: -5;
		cursor: default;
	}
	h2 {
		width: max-content;
		margin: 2em auto 0 auto;
		font-size: 2em;
		padding: 0.25em;
		background: #fff9;
		border-radius: 0.25em;
	}
</style>
