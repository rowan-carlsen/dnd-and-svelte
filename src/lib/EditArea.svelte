<script lang="ts">
	import { areaNames } from "./neighborhood-names";

	const { renameArea }: { renameArea: HTMLElement | undefined } = $props();
	let areaCode: string | undefined = $derived(renameArea?.dataset.area);
	let dialog: HTMLDialogElement | undefined = $state();
	$effect(() => {
		if (areaCode && dialog) {
			dialog.showModal();
		}
	});
</script>

<dialog bind:this={dialog}>
	<h2>{areaCode ? areaNames[areaCode].name : "Error: Not Found"}</h2>
	<div>Name this area: <input type="text" placeholder="Name" /></div>
	<div class="button-holder"><button type="button">Submit</button></div>
</dialog>

<style>
	h2 {
		text-align: center;
		margin-top: 0;
	}
	.button-holder {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
	}
	dialog {
		/* margin: auto; */
	}
</style>
