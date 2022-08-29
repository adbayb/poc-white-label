import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

export default defineConfig({
	plugins: [
		react(),
		federation({
			filename: "remoteEntry.js",
			exposes: {
				"./Renderer": "./src/Renderer",
			},
			// @todo: react-dom, react/jsx-runtime, ...
			shared: {
				react: {
					requiredVersion: pkg.dependencies["react"],
				},
				"react-dom": {
					requiredVersion: pkg.dependencies["react-dom"],
				},
			},
		}),
	],
});
