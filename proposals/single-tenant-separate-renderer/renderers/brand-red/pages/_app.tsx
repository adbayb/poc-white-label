import type { AppProps } from "next/app";
import Head from "next/head";
import { DesignSystemProvider } from "@framework/design-system";
import { Layout } from "@single-tenant-separate-renderer/white-label-application";
import { DESCRIPTION, TITLE } from "../constants";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DesignSystemProvider
			theme={Object.freeze({
				colors: Object.freeze({
					"accent-primary": "#be3333",
					"accent-secondary": "#fddddd",
					"neutral-white": "#ffffff",
					"neutral-black": "#000000",
				}),
				radius: Object.freeze({
					"radius-0": 0,
					"radius-4": 4,
				}),
				shadows: Object.freeze({
					"shadow-0": "0px 0px 0px rgba(0, 0, 0, 0)",
					"shadow-6": "0px 1px 6px rgba(0, 0, 0, 0.25)",
				}),
				spacings: Object.freeze({
					"spacing-0": 0,
					"spacing-4": 4,
					"spacing-8": 8,
					"spacing-12": 12,
					"spacing-16": 16,
					"spacing-20": 20,
					"spacing-24": 24,
				}),
				texts: Object.freeze({
					"text-0": 0,
					"text-14": 14,
					"text-24": 24,
					"text-48": 48,
				}),
			})}
		>
			<Head>
				<title>{TITLE}</title>
				<meta
					name="description"
					content={DESCRIPTION}
				/>
			</Head>

			<Layout>
				<Component {...pageProps} />
				<Footer />
			</Layout>
		</DesignSystemProvider>
	);
}

export default MyApp;
