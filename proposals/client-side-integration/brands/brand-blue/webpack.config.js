const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

const PORT = process.env.PORT || 3000;

console.log(`PORT = ${PORT}`);

module.exports = {
	entry: {
		shell: "./src/index.ts",
	},
	devServer: {
		static: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
		port: PORT,
		liveReload: true,
		hot: true,
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
			name: "brand-blue",
			library: { type: "var", name: "brand-blue" },
			remotes: ["white_label"],
			shared: [...Object.keys(pkgDependencies), "react/jsx-runtime"].reduce(
				(shared, name) => {
					shared[name] = {
						eager: true,
						singleton: true,
						requiredVersion: pkgDependencies[name],
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
