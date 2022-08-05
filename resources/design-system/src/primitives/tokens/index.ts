import { createContext, useContext } from "react";
import { DEFAULT_THEME } from "./constants";

export type BreakpointTokenName = "small" | "large";
export type ColorTokenName =
	| "accent-primary"
	| "accent-secondary"
	| "neutral-white"
	| "neutral-black";
export type RadiusTokenName = "radius-0" | "radius-4";
export type ShadowTokenName = "shadow-0" | "shadow-6";
export type SpacingTokenName =
	| "spacing-0"
	| "spacing-4"
	| "spacing-8"
	| "spacing-12"
	| "spacing-16"
	| "spacing-20"
	| "spacing-24";
export type TextTokenName = "text-0" | "text-14" | "text-24" | "text-36";

export type TokenValue = {
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
