import { createShell } from "../createShell";

export default createShell({
	title: "brand-red",
	description: "👋 from brand-red",
	theme: Object.freeze({
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
	}),
});
