/* eslint-disable import/no-default-export, import/namespace */
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";

const isDev = process.argv.includes("--watch");

const createConfig = (target = "react") => {
	let output;

	switch (target) {
		case "vue":
			output = {
				file: pkg["exports"]["./vue"]["import"]["default"],
				format: "es",
				sourcemap: isDev,
			};

			break;
		case "react":
		default:
			output = {
				file: pkg["exports"]["."]["import"]["default"],
				format: "es",
				sourcemap: isDev,
			};

			break;
	}

	return {
		input: pkg.source,
		output,
		external: [
			...Object.keys(pkg.optionalDependencies),
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
};

export default [createConfig(), createConfig("vue")];
