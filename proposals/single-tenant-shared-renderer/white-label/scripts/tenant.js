const fs = require("fs").promises;
const fsExtra = require("fs-extra");
const path = require("path");

const TENANT_ID = process.env.TENANT_ID;

prepare();

async function prepare() {
	await copyStaticFiles();
}

async function copyStaticFiles() {
	const logLabel = `Copying tenant ("${TENANT_ID}") static files...`;

	console.log(logLabel);

	try {
		// @section: clean next public folder
		const srcDir = path.resolve(
			require.resolve(
				`@single-tenant-shared-renderer/white-label-tenant-${TENANT_ID}`
			),
			"../../public"
		);
		const destDir = "./public";
		const srcFiles = await fs.readdir(destDir);

		for (const file of srcFiles) {
			if (file !== ".gitkeep") {
				await fs.rm(path.join(destDir, file), { recursive: true });
			}
		}

		// @section copy tenant public files
		await fsExtra.copy(srcDir, destDir, { overwrite: true });

		console.log(`${logLabel} ✅`);
	} catch (error) {
		console.log(`${logLabel} ❌`, error);
	}
}
