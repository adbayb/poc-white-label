import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

export default defineConfig({
	build: {
		target: "esnext",
	},
	plugins: [
		react(),
		federation({
			remotes: {
				white_label: "http://localhost:5001/dist/assets/remoteEntry.js",
			},
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
