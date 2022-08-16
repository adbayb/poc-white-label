import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Shell } from "../components/TenantProxy"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Shell>
			<Component {...pageProps} />
		</Shell>
	);
}

export default MyApp;
