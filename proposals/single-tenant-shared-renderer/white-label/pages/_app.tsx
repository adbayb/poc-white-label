import type { AppProps } from "next/app";
import { Shell } from "../components/BrandProxy";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Shell>
			<Component {...pageProps} />
		</Shell>
	);
}

export default MyApp;
