/**
 * Tokens are the smallest possible building block inside the component kit.
 * They manage core design value decisions (such as colors, spacings...) to ensure consistent and adaptive experiences.
 * Tokens are key building blocks to open the component kit for customization: they enable theming approach and platform (eg. mobile vs desktop) scale.
 */

import { createContext, useContext } from "react";
import { DEFAULT_THEME } from "./constants";

// @note: to be platform independent, the breakpoint naming follows the screen size and not device type specificity (eg. mobile, desktop...)
export type BreakpointTokenName = "small" | "large";
export type ColorTokenName =
	| "accent-primary"
	| "accent-secondary"
	| "accent-tertiary"
	| "neutral-white"
	| "neutral-black"
	| "neutral-lightblack"
	| "neutral-gray"
	| "neutral-lightgray"
	| "neutral-darkgray";
// @note: To reduce cognitive load, following tokens are named accordingly to their underlying value.
// Though, this might be less scalable if the application needs to handle later a different value set (eg. theming).
// @note 2: "0" value is interesting to enable transition between token values.
export type RadiusTokenName = "radius-0" | "radius-2" | "radius-8";
export type ShadowTokenName = "shadow-0" | "shadow-6";
export type SpacingTokenName =
	| "spacing-0"
	| "spacing-4"
	| "spacing-6"
	| "spacing-10"
	| "spacing-12"
	| "spacing-16"
	| "spacing-22"
	| "spacing-24"
	| "spacing-32"
	| "spacing-36"
	| "spacing-44";
export type TextTokenName = "text-0" | "text-14" | "text-16" | "text-18";

export type TokenValue = {
	breakpoints: Readonly<Record<BreakpointTokenName, number>>;
	colors: Readonly<Record<ColorTokenName, string>>;
	radius: Readonly<Record<RadiusTokenName, number>>;
	shadows: Readonly<Record<ShadowTokenName, string>>;
	spacings: Readonly<Record<SpacingTokenName, number>>;
	texts: Readonly<Record<TextTokenName, number>>;
};

const TokenContext = createContext<TokenValue>(DEFAULT_THEME);

export const TokenProvider = TokenContext.Provider;

export const useToken = () => {
	return useContext(TokenContext);
};
