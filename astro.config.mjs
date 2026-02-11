import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

export default defineConfig({
	site: "https://reformaslaguxan.es",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: false,
	},
	build: {
		inlineStylesheets: "auto",
	},
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssMinify: true,
			minify: "esbuild",
		},
	},
})
