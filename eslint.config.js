import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.node },
	},
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	globalIgnores(["tests/**/*.test.ts", "dist/**/*.js"]),
	tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-namespace": "off",
			"consistent-return": 2,
			"no-console": 0,
			quotes: [2, "double"],
			semi: [2, "never"],
			"linebreak-style": [2, "unix"],
			indent: [2, "tab", { SwitchCase: 1 }],
		},
	},
])
