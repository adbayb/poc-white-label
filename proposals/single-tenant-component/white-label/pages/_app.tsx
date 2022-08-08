import "../styles/globals.css";
import type { AppProps } from "next/app";
const Shell = require(`@single-tenant-component/shells/${process.env.BRAND_ID}`).default

function MyApp({ Component, pageProps }: AppProps) {
	return <Shell><Component {...pageProps} /></Shell>;
}

export default MyApp;
