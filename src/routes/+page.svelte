<script lang="ts">
	import { resolve } from "$app/paths";
	import type { LayoutRouteId } from "./$types";

	type InternalRoute = Exclude<LayoutRouteId, null>;
	type BulletItem = string | { text: string; link: InternalRoute };

	type Slide = {
		title: string;
		subtitle?: string;
		bullets: BulletItem[];
		background: string;
		coverSlide?: boolean;
	};

	const dnd = "/bg/d&d.webp";
	const callOfCthulhu = "/bg/coc.jpg";
	const deltaGreen = "/bg/delta-green.jpg";
	const fate = "/bg/fate.jpg";
	const lancer = "/bg/lancer-best.jpeg";

	const slides: Slide[] = [
		{
			title: "D&D&Svelte: Svelte Mini-Apps to Enhance Your Tabletop Games",
			bullets: [],
			background: dnd,
			coverSlide: true
		},
		{
			title: "What This Talk Is (and Isn't!)",
			bullets: [
				'More inspiration, less "how-to"',
				"Made by a Svelte fan, not a Svelte master",
				'"Toys", props, and accessories, NOT a VTT or essential utility',
				"Not monetization of your hobby, not the next startup idea, not a hustle!"
			],
			background: callOfCthulhu
		},
		{
			title: "Why Make Mini-Apps? (And how do they fit on a tabletop??)",
			bullets: [
				'Uh...it\'s fun? [We probably all enjoy web dev to some degree, but making banking websites is a lot less "fun" than working on a cool idea you had for your game. And it lets you pretend to be a ]'
			],
			background: deltaGreen
		},
		{
			title: "OK, But Why Svelte?",
			bullets: [
				"Quick, easy spin up for disposable mini-apps",
				"No need for things Svelte ecosystem is weaker in - like sophisticated UI libraries or data management frameworks",
				"Instant config with adapters like netlify, vercel, static (for GitHub Pages, e.g.)"
			],
			background: fate
		},
		{
			title: "Something about AI",
			bullets: ["Nope! Not this time."],
			background: fate
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "Landing Pages!",
			bullets: [
				"Think Character Rosters, Lore your players won't read, maps",
				{ text: "Mission Briefing (TBD desc)", link: "/mission-briefing" }
			],
			background: lancer
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "Puzzles/mini-games!",
			bullets: [
				"Keep the scope very small - 5 minutes of interaction is usually enough. This is NOT about getting a great RoI of time spent.",
				{ text: "Shadow Puzzle (TBD desc)", link: "/shadow-puzzle" },
				{ text: "Block Puzzle (TBD desc)", link: "/block-puzzle" }
			],
			background: lancer
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "Interactive visuals!",
			bullets: [
				"Even tiny interactions are pretty spiffy when you're using your imagination to begin with. Hover effects, anything that feels like a video game",
				{
					text: "By Dim Light (Examine something creepy by torch (or similar) light",
					link: "/by-dim-light"
				},
				{
					text: "Mudross Remnants (Map with light hover interactivity)",
					link: "/mudross-remnants"
				}
			],
			background: lancer
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "(Hard mode) Apps for your players to actually use!",
			bullets: [
				"MUST be mobile first, and may need websockets or at least aggressive polling if there is shared state.",
				"Aim for a shared tablet instead of each player's phone - phones can be a hazard to player engagement",
				{ text: "Alt NYC Map (TBD desc)", link: "/alt-nyc-map" }
			],
			background: lancer
		}
	];

	let currentSlide = $state(1);
	let slide = $derived(slides[currentSlide - 1]);
	let background = $derived(slide.background);

	const totalSlides = slides.length; // +1 for the title slide

	function nextSlide() {
		if (currentSlide < totalSlides) {
			currentSlide++;
		}
	}

	function prevSlide() {
		if (currentSlide > 1) {
			currentSlide--;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "ArrowRight" || event.key === " ") {
			nextSlide();
		} else if (event.key === "ArrowLeft") {
			prevSlide();
		}
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href="/bg/coc.jpg" />
	<link rel="preload" as="image" href="/bg/delta-green.jpg" />
	<link rel="preload" as="image" href="/bg/fate.jpg" />
	<link rel="preload" as="image" href="/bg/lancer-best.jpeg" />
</svelte:head>
<svelte:window onkeydown={handleKeydown} />

<main style={`--bgImage: url(${background})`}>
	<h1 class:hidden={currentSlide <= 1}>D&D&Svelte</h1>
	{#key background}
		<div class="slide">
			{#if slide.coverSlide}
				<h1>{slide.title}</h1>
			{:else}
				<h2>{slide.title}</h2>
			{/if}
			{#if slide.subtitle}
				<h3>{slide.subtitle}</h3>
			{/if}
			<ul>
				{#each slide.bullets as bullet, i (i)}
					<li>
						{#if typeof bullet === "string"}
							{bullet}
						{:else}
							<a target="_blank" href={resolve(bullet.link)}>{bullet.text}</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/key}
	<div class="controls">
		<button onclick={prevSlide} disabled={currentSlide === 1}> ← Previous </button>
		<span class="counter">{currentSlide} / {totalSlides}</span>
		<button onclick={nextSlide} disabled={currentSlide === totalSlides}> Next → </button>
	</div>
	<img class="image-load" src={callOfCthulhu} alt="" width="2160" height="1080" />
	<img class="image-load" src={deltaGreen} alt="" width="1024" height="512" />
	<img class="image-load" src={fate} alt="" width="900" height="1350" />
	<img class="image-load" src={lancer} alt="" width="1920" height="1080" />
</main>

<style>
	.image-load {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: -10;
	}
	main {
		position: relative;
		max-height: 100vh;
		height: 100vh;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		justify-items: center;
		padding: 1.5em;
		background-color: black;
		background-image: var(--bgImage);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		color: white;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		font-size: 1vw;
		overflow: hidden;
	}
	.slide {
		max-width: 800px;
		width: 100%;
		padding: 1rem;
		overflow: auto;
		display: flex;
		flex-direction: column;
		background: #000b;
		border-radius: 0.5em;
		opacity: 0;
		animation: fade-in 1s 2s forwards;
	}
	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}
	.slide a {
		color: hotpink;
	}
	h1 {
		font-size: 3em;
		margin: auto 0;
		line-height: 1.2;
		justify-self: baseline;
		text-align: center;
	}
	h1.hidden {
		visibility: hidden;
	}

	h2 {
		font-size: 2.5em;
		margin: 0 0 1.5em 0;
		line-height: 1.2;
		text-align: center;
	}

	h3 {
		font-size: 2em;
		margin: 0 0 1em 0;
		line-height: 1.2;
	}

	ul {
		font-size: 1.5em;
		line-height: 1.8;
		margin: 0;
		padding-left: 2em;
	}

	ul li {
		margin-bottom: 1em;
	}

	.controls {
		margin-top: 2em;
		display: flex;
		gap: 2em;
		align-items: center;
		cursor: default;
		background: #000b;
		padding: 1em;
		border-radius: 1em;
	}

	button {
		padding: 0.75em 1.5em;
		font-size: 1em;
		background: rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.3);
		color: white;
		border-radius: 0.5em;
		cursor: pointer;
		transition: all 0.15s;
		font-weight: 600;
	}

	button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}

	button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.counter {
		font-size: 1.2em;
		font-weight: 600;
		opacity: 0.8;
	}
</style>
