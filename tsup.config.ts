import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: true,
	outDir: "dist",
	splitting: true,
	sourcemap: true,
	minify: false,
	clean: true
})
