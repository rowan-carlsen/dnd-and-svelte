<script>
	import { resolve } from "$app/paths";
</script>

<nav class="mission">
	<ul>
		<li><a href={resolve("/mission-briefing")}>MISSION</a></li>
		<li><a href={resolve("/mission-briefing/crew")}>CREW</a></li>
		<li>
			<audio src="/ME2.mp3" autoplay loop muted controls volume={0.5}></audio>
		</li>
	</ul>
</nav>
<slot />

<style>
	:global(body:has(.mission)) {
		color: white;
		background-color: #000;
		font-family: "Rajdhani", sans-serif;
		position: relative;
		padding: 0;
		margin: 0;
	}

	nav ul {
		display: flex;
		list-style-type: none;
		gap: 1em;
		padding: 0.5em 1em;
		margin: 0;
	}
	li:has(audio) {
		margin-left: auto;
	}
	a {
		text-decoration: none;
		color: white;
	}
</style>
