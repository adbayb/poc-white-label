import Head from "next/head";
import { DesignSystemProvider, TokenValue } from "@framework/design-system";
import { ShellProps } from "../types";

export type { ShellProps };

export const Shell = ({ children }: ShellProps) => {
	return (
		<>
			<Head>
				<title>brand-red</title>
				<meta
					name="description"
					content="Hello from brand-red"
				/>
			</Head>
			<DesignSystemProvider theme={THEME}>{children}</DesignSystemProvider>
			<footer>brand-red</footer>
		</>
	);
};

const THEME: TokenValue = Object.freeze({
	colors: Object.freeze({
		"accent-primary": "#ff0000",
		"accent-secondary": "#af0000",
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
		"text-24": 16,
		"text-36": 18,
	}),
});
