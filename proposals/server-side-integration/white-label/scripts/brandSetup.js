const fs = require("fs").promises;
const fsExtra = require("fs-extra");
const path = require("path");

const BRAND_ID = process.env.BRAND_ID;

prepare();

async function prepare() {
	await copyStaticFiles();
}

async function copyStaticFiles() {
	const logLabel = `Copying brand ("${BRAND_ID}") static files...`;

	console.log(logLabel);

	try {
		// @section: clean next public folder
		const srcDir = path.resolve(
			require.resolve(`@server-side-integration/shell`),
			`../../src/brands/${BRAND_ID}/public`
		);
		const destDir = "./public";
		const srcFiles = await fs.readdir(destDir);

		for (const file of srcFiles) {
			if (file !== ".gitkeep") {
				await fs.rm(path.join(destDir, file), { recursive: true });
			}
		}

		// @section copy public files
		await fsExtra.copy(srcDir, destDir, { overwrite: true });

		console.log(`${logLabel} ✅`);
	} catch (error) {
		console.log(`${logLabel} ❌`, error);
	}
}
