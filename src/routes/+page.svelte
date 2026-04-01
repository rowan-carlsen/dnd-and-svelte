<script lang="ts">
	import { base, resolve } from "$app/paths";
	import logo from "$lib/assets/favicon.svg";
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

	const dnd = `${base}/bg/d&d.webp`;
	const callOfCthulhu = `${base}/bg/coc.jpg`;
	const deltaGreen = `${base}/bg/delta-green.jpg`;
	const fate = `${base}/bg/fate.jpg`;
	const lancer = `${base}/bg/lancer-best.jpeg`;

	const slides: Slide[] = [
		{
			title: `D&D&<img class="logo" class="logo" src=${logo} alt="" />velte: Svelte Mini-Apps to Enhance Your Tabletop Games`,
			bullets: [],
			background: dnd,
			coverSlide: true
		},
		{
			title: "What This Talk Is (and Isn't!)",
			bullets: [
				'More inspiration, less "how-to"',
				"Made by a Svelte fan, NOT a Svelte master",
				`"Toys", props, and accessories, NOT a VTT or essential utility`,
				"NOT monetization of your hobby, the next startup idea, or a hustle!",
				"NOT a way to recruit players for my games...unless?"
			],
			background: callOfCthulhu
		},
		{
			title: "Why Make Mini-Apps? (And how do they fit on a tabletop??)",
			bullets: [
				"Great way to learn or practice web technologies of any kind",
				`It will engage your players, like any other "prop" - and maybe you as well`,
				"You can pretend to be a game dev",
				"Uh...it's fun?"
			],
			background: deltaGreen
		},
		{
			title: "OK, But Why Svelte?",
			bullets: [
				"Quick, easy spin up for disposable mini-apps",
				"No need for things Svelte ecosystem is (arguably) weaker in - like sophisticated UI libraries or data management frameworks",
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
				"Think Character Rosters, lore your players won't read, maps, bestiaries",
				{ text: "Mission Briefing", link: "/mission-briefing" }
			],
			background: lancer
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "Puzzles/mini-games!",
			bullets: [
				"Keep the scope very small - 5 minutes of interaction is usually enough",
				"You will spend WAY more time planning/designing/creating than your players will playing - must be OK with that",
				{ text: "Shadow Puzzle", link: "/shadow-puzzle" },
				{ text: "Block Puzzle", link: "/block-puzzle" }
			],
			background: lancer
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "Interactive visuals!",
			bullets: [
				"Players are already using their imaginations - even tiny interactions work wonders.",
				"Hover effects, buttons that light up - anything that feels like a video game",
				{
					text: "By Dim Light",
					link: "/by-dim-light"
				},
				{
					text: "Ruins of the Empire",
					link: "/mudross-remnants"
				}
			],
			background: lancer
		},
		{
			title: "Ways to Interface With Your Game(s)",
			subtitle: "(Hard mode) Apps for your players to actually use?",
			bullets: [
				"MUST be mobile first, and may need websockets or at least aggressive polling if there is shared state",
				"Consider a shared tablet instead of each player's phone - phones can be a hazard to player engagement",
				{ text: "Urban Fantasy NYC Map", link: "/alt-nyc-map" }
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
	<link rel="preload" as="image" href={callOfCthulhu} />
	<link rel="preload" as="image" href={deltaGreen} />
	<link rel="preload" as="image" href={fate} />
	<link rel="preload" as="image" href={lancer} />
	<title>D&D&Svelte</title>
</svelte:head>
<svelte:window onkeydown={handleKeydown} />

<main style={`--bgImage: url(${background})`}>
	<h1 class:hidden={currentSlide <= 1}>D&D&<img class="logo" src={logo} alt="" />velte</h1>
	{#key background}
		<div class="slide">
			{#if slide.coverSlide}
				<!--  eslint-disable-next-line svelte/no-at-html-tags -->
				<h1>{@html slide.title}</h1>
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
	@font-face {
		font-family: "MrEaves";
		src: url("/mr-eaves.otf") format("opentype");
	}
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
		max-width: 60vw;
		width: 100%;
		padding: 1rem;
		overflow: auto;
		display: flex;
		flex-direction: column;
		background: #000b;
		border-radius: 0.5em;
		opacity: 0;
		animation: fade-in 1s 2s forwards;
		animation: fade-in 1s 0s forwards;
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
		font-family: "MrEaves";
		color: #f70002;
		font-size: 3em;
		margin: auto 0;
		line-height: 1.2;
		justify-self: baseline;
		text-align: center;
	}
	h1.hidden {
		visibility: hidden;
	}
	:global(h1 .logo) {
		width: auto;
		height: 1em;
		line-height: 1em;
		vertical-align: middle;
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
