<script lang="ts">
	import { resolve } from "$app/paths";

	let currentSlide = $state(0);
	const totalSlides = 7;

	function nextSlide() {
		if (currentSlide < totalSlides - 1) {
			currentSlide++;
		}
	}

	function prevSlide() {
		if (currentSlide > 0) {
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

<main>
	{#if currentSlide === 0}
		<div class="slide">
			<h1>D&D&Svelte: Svelte mini-apps to enhance your tabletop games</h1>
		</div>
	{:else if currentSlide === 1}
		<div class="slide">
			<h2>What This Talk Is (and Isn't!)</h2>
			<ul>
				<li>More inspiration, less "how-to"</li>
				<li>Made by a Svelte fan, not a Svelte master</li>
				<li>"Toys", props, and accessories, NOT a VTT or essential utility</li>
				<li>Not monetization of your hobby, not the next startup idea, not a hustle!</li>
			</ul>
		</div>
	{:else if currentSlide === 2}
		<div class="slide">
			<h2>Why Make Mini-Apps? (And how do they fit on a tabletop??)</h2>
			<ul>
				<li>
					Uh...it's fun? [We probably all enjoy web dev to some degree, but making banking websites
					is a lot less "fun" than working on a cool idea you had for your game. And it lets you
					pretend to be a ]
				</li>
			</ul>
		</div>
	{:else if currentSlide === 3}
		<div class="slide">
			<h2>OK, But Why Svelte?</h2>
			<ul>
				<li>Quick, easy spin up for disposable mini-apps</li>
				<li>
					No need for things Svelte ecosystem is weaker in - like sophisticated UI libraries or data
					management frameworks
				</li>
				<li>Instant config with adapters like netlify, vercel, static (for GitHub Pages, e.g.)</li>
			</ul>
		</div>
	{:else if currentSlide === 4}
		<div class="slide">
			<h2>Something about AI</h2>
			<ul>
				<li>Nope! Not this time.</li>
			</ul>
		</div>
	{:else if currentSlide === 5}
		<div class="slide">
			<h2>Ways to Interface With Your Game(s)</h2>
			<ul>
				<li>
					<strong>Landing Pages!</strong>
					<ul class="sub-list">
						<li>Think Character Rosters, Lore your players won't read, maps</li>
					</ul>
				</li>
				<li>
					<strong>Puzzles/mini-games!</strong>
					<ul class="sub-list">
						<li>
							Keep the scope very small - 5 minutes of interaction is usually enough. This is NOT
							about getting a great RoI of time spent.
						</li>
					</ul>
				</li>
				<li>
					<strong>Interactive visuals!</strong>
					<ul class="sub-list">
						<li>
							Even tiny interactions are pretty spiffy when you're using your imagination to begin
							with. Hover effects, anything that feels like a video game
						</li>
					</ul>
				</li>
				<li>
					<strong>(Hard mode) Apps for your players to actually use!</strong>
					<ul class="sub-list">
						<li>
							MUST be mobile first, and may need websockets or at least aggressive polling if there
							is shared state.
						</li>
						<li>
							Aim for a shared tablet instead of each player's phone - phones can be a hazard to
							player engagement
						</li>
					</ul>
				</li>
			</ul>
		</div>
	{:else if currentSlide === 6}
		<div class="slide">
			<h2>Walkthrough of stuff I've made</h2>
			<ul>
				<li>Start with TBD/Proof of concept stuff - NYC map and shadow puzzle</li>
				<li>Move into 'cute' visuals - dim light and mudross remnants map</li>
				<li>End with 'good' finished products, block puzzle and missiong-briefing</li>
				<li><a href={resolve("/menu")}>Show me the goods!</a></li>
			</ul>
		</div>
	{/if}

	<div class="controls">
		<button
			onclick={(e) => {
				e.stopPropagation();
				prevSlide();
			}}
			disabled={currentSlide === 0}
		>
			← Previous
		</button>
		<span class="counter">{currentSlide + 1} / {totalSlides}</span>
		<button
			onclick={(e) => {
				e.stopPropagation();
				nextSlide();
			}}
			disabled={currentSlide === totalSlides - 1}
		>
			Next →
		</button>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 2rem;
		background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%);
		color: white;
		cursor: pointer;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	.slide {
		max-width: 900px;
		width: 100%;
		text-align: left;
		padding: 3rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
		min-height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	h1 {
		font-size: 3rem;
		margin: 0;
		line-height: 1.2;
		text-align: center;
	}

	h2 {
		font-size: 2.5rem;
		margin: 0 0 1.5rem 0;
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
		transition: all 0.2s;
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
