/* eslint-disable import/no-default-export, import/namespace */
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import smartAsset from "rollup-plugin-smart-asset";
import pkg from "./package.json";

const isDev = process.argv.includes("--watch");

const createConfig = (target) => {
	const importData = pkg["exports"][`./${target}`]["import"];
	const input = importData.source;
	const output = {
		file: importData.default,
		format: "es",
		sourcemap: isDev,
	};

	return {
		input,
		output,
		external: [
			...Object.keys(pkg.peerDependencies),
			...Object.keys(pkg.devDependencies),
			"next/head",
			"react/jsx-runtime",
			"react/jsx-dev-runtime",
		],
		plugins: [
			nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx", ".json"] }),
			typescript({
				tsconfig: "./tsconfig.json",
				outputToFilesystem: true,
			}),
			commonjs(),
			smartAsset({
				emitFiles: true,
				url: "copy",
			}),
			!isDev && filesize(),
		].filter(Boolean),
	};
};

export default [createConfig("brand-blue"), createConfig("brand-red")];
