<script lang="ts">
	import { resolve } from "$app/paths";
	import type { LayoutRouteId } from "./$types";
	import callOfCthulhu from "$lib/assets/bg/coc.jpg";
	import dnd from "$lib/assets/bg/d&d.webp";
	import deltaGreen from "$lib/assets/bg/delta-green.jpg";
	import fate from "$lib/assets/bg/fate.jpg";
	import lancer from "$lib/assets/bg/lancer-best.jpeg";

	type InternalRoute = Exclude<LayoutRouteId, null>;
	type BulletItem = string | { text: string; link: InternalRoute };

	type Slide = {
		title: string;
		subtitle?: string;
		bullets: BulletItem[];
		background: string;
	};

	const slides: Slide[] = [
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

	const totalSlides = slides.length + 1; // +1 for the title slide

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

<svelte:window onkeydown={handleKeydown} onclick={nextSlide} />

<main style={`--bgImage: url(${currentSlide > 1 ? slides[currentSlide - 2].background : dnd})`}>
	<h1 class:middle={currentSlide === 1}>
		D&D&Svelte: Svelte mini-apps to enhance your tabletop games
	</h1>
	<div class="slide">
		{#if currentSlide > 1}
			{@const slide = slides[currentSlide - 2]}
			<h2>{slide.title}</h2>
			{#if slide.subtitle}
				<h3>{slide.subtitle}</h3>
			{/if}
			<ul class={slide.subtitle ? "sub-list" : ""}>
				{#each slide.bullets as bullet, i (i)}
					<li>
						{#if typeof bullet === "string"}
							{bullet}
						{:else}
							<a href={resolve(bullet.link)}>{bullet.text}</a>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<div class="controls">
		<button
			onclick={(e) => {
				e.stopPropagation();
				prevSlide();
			}}
			disabled={currentSlide === 1}
		>
			← Previous
		</button>
		<span class="counter">{currentSlide} / {totalSlides}</span>
		<button
			onclick={(e) => {
				e.stopPropagation();
				nextSlide();
			}}
			disabled={currentSlide === totalSlides}
		>
			Next →
		</button>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		justify-items: center;
		align-items: center;
		padding: 2rem;
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
	}
	.slide {
		margin: 0 auto;
		max-width: 800px;
		width: 100%;
		padding: 1rem;
	}
	h1 {
		font-size: 3rem;
		margin: 1rem 2rem;
		line-height: 1.2;
		text-align: center;
	}
	h1.middle {
		grid-row: span 2;
	}
	h1.middle ~ .slide {
		display: none;
	}
	h2 {
		font-size: 2.5rem;
		margin: 0 0 1.5rem 0;
		line-height: 1.2;
	}

	h3 {
		font-size: 2rem;
		margin: 0 0 1rem 0;
		line-height: 1.2;
	}

	ul {
		font-size: 1.5rem;
		line-height: 1.8;
		margin: 0;
		padding-left: 2rem;
	}

	ul li {
		margin-bottom: 1rem;
	}

	.sub-list {
		font-size: 1.2rem;
		margin-top: 0.5rem;
		opacity: 0.9;
	}

	.sub-list li {
		margin-bottom: 0.5rem;
	}

	.controls {
		margin-top: 2rem;
		display: flex;
		gap: 2rem;
		align-items: center;
		cursor: default;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		background: rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.3);
		color: white;
		border-radius: 0.5rem;
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
		font-size: 1.2rem;
		font-weight: 600;
		opacity: 0.8;
	}
</style>
