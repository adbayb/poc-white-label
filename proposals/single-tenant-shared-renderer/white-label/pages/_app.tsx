import "../styles/globals.css";
import type { AppProps } from "next/app";

const Shell = require(`@single-tenant-shared-renderer/shells/${process.env.BRAND_ID}`)
	.default as typeof import("@single-tenant-shared-renderer/shells/brand-red").default;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Shell>
			<Component {...pageProps} />
		</Shell>
	);
}

export default MyApp;
