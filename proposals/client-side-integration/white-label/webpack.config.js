const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

const PORT = 5001;

module.exports = {
	entry: "./src/index.ts",
	devServer: {
		static: path.join(__dirname, "dist"),
		port: PORT,
		hot: true,
		liveReload: true,
	},
	output: {
		publicPath: `http://localhost:${PORT}/`,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "white_label",
			library: { type: "var", name: "white_label" },
			filename: "remoteEntry.js",
			exposes: {
				"./Renderer": "./src/Renderer",
			},
			shared: [...Object.keys(pkgDependencies), "react/jsx-runtime"].reduce(
				(shared, moduleName) => {
					shared[moduleName] = {
						eager: false,
						singleton: true,
						requiredVersion: pkgDependencies[moduleName],
						strictVersion: false,
					};

					return shared;
				},
				{}
			),
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
