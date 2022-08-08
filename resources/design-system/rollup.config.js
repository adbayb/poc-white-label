/* eslint-disable import/no-default-export, import/namespace */
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";

const isDev = process.argv.includes("--watch");

export default {
	input: pkg.source,
	output: {
		file: pkg.module,
		format: "es",
		sourcemap: isDev,
	},
	external: [
		...Object.keys(pkg.peerDependencies),
		...Object.keys(pkg.devDependencies),
	],
	plugins: [
		nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx", ".json"] }),
		typescript({
			tsconfig: "./tsconfig.json",
			outputToFilesystem: true,
		}),
		commonjs(),
		!isDev && filesize(),
	].filter(Boolean),
};
