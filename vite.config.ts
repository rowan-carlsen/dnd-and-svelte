import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
	if (command === "serve") {
		return { plugins: [sveltekit()] };
	} else {
		return {
			base: "/dnd-and-svelte/",
			plugins: [sveltekit()]
		};
	}
});
