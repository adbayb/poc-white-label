import type { AppProps } from "next/app";
import { Shell } from "@server-side-integration/shell";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Shell>
			<Component {...pageProps} />
		</Shell>
	);
}

export default MyApp;
