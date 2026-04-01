<script lang="ts">
	import { areaNames, newNames } from "./neighborhood-names.svelte.ts";

	const { renameArea }: { renameArea: HTMLElement | undefined } = $props();
	let areaCode: string | undefined = $derived(renameArea?.dataset.area);
	let dialog: HTMLDialogElement | undefined = $state();
	$effect(() => {
		if (areaCode && dialog) {
			dialog.querySelector("form")?.reset();
			dialog.showModal();
		}
	});
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const newName = formData.get("name");
		if (newName && typeof newName === "string" && areaCode) {
			newNames[areaCode] = { name: newName };
			console.log(newNames);
		}
		dialog?.close();
	}
</script>

<dialog bind:this={dialog}>
	<form onsubmit={handleSubmit}>
		<h2>
			{areaCode
				? newNames[areaCode]
					? newNames[areaCode].name
					: areaNames[areaCode].name
				: "Error: name not found"}
		</h2>
		<div>Name this area: <input name="name" type="text" placeholder="Name" /></div>
		<div class="button-holder"><button type="submit">Submit</button></div>
	</form>
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
</style>
