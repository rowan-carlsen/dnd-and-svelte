<svelte:head><title>Ruins of the Empire</title></svelte:head>

<div style="color: transparent; position: absolute;">font load</div>
<div class="remnants" id="map-outer">
	<img src="Mudross-Remnants.jpg" width="1024" height="768" alt="mudross map" />
	<div class="marker" id="arca">
		<div class="description">
			<h2>Arca Nobilia</h2>
			<p>
				Dominion Treasury - reports of dragon presence, approach only with full-strength regiment
			</p>
		</div>
	</div>
	<div class="marker" id="zone52">
		<div class="description">
			<h2>Zone 52</h2>
			<p>Research facility? Lacking intel - scouts have not returned</p>
		</div>
	</div>
	<div class="marker" id="cryptarium">
		<div class="description">
			<h2>Cryptarium</h2>
			<p>Housed exotic, magical beasts - possible weaponization potential</p>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");

	:global(body:has(.remnants)) {
		background: black;
	}
	* {
		font-family: "Kaushan Script", cursive;
	}
	#map-outer {
		width: max-content;
		margin: 0 auto;
		position: relative;
	}
	.marker {
		width: 2.5em;
		height: 2.5em;
		background-image: linear-gradient(to bottom, slategrey, 70%, #eee);
		position: absolute;
		border: 8px solid #332920;
		cursor: pointer;
		z-index: 10;
	}
	#arca {
		top: 38%;
		left: 35%;
	}
	#zone52 {
		left: 70%;
		top: 18%;
		border-radius: 1em 1em 0 0;
	}
	#zone52::before {
		content: "";
		position: absolute;
		background-image: linear-gradient(to bottom, slategrey, 70%, #eee);
		width: 65%;
		height: 70%;
		z-index: 20;
		top: 18%;
		left: 18%;
		clip-path: polygon(0 100%, 50% 0, 100% 100%);
	}
	#cryptarium {
		border-radius: 10em;
		left: 8%;
		top: 55%;
		width: 2.7em;
		height: 2.7em;
	}
	.marker::after {
		content: "";
		position: absolute;
		width: calc(100% + 8px);
		height: calc(100% + 8px);
		top: -4px;
		left: -4px;
		border: 3px dashed #0047ab;
		border-radius: 10em;
		transform: scale(2);
		animation: spin 4s infinite linear;
		visibility: hidden;
		opacity: 0;
	}
	.marker:hover::after {
		visibility: visible;
		opacity: 1;
		transition: opacity 0.5s;
	}
	.description {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		top: 100%;
		left: 50%;
		background: transparent;
		font-size: 1.2rem;
		width: 15em;
	}
	#zone52 .description {
		transform: translateX(-60%);
	}
	.marker:hover .description {
		visibility: visible;
		transition: opacity 0.5s;
		opacity: 1;
	}
	@keyframes spin {
		to {
			transform: scale(2) rotate(360deg);
		}
	}
</style>
