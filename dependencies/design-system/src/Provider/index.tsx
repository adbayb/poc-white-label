import { ReactNode } from "react";
import { extractStyles } from "coulis";
import { TokenProvider, TokenValue } from "../primitives/tokens";
import { DEFAULT_THEME } from "../primitives/tokens/constants";

import "./resetStyles";

export type DesignSystemProviderProps = {
	children: ReactNode;
	theme?: TokenValue;
};

export const DesignSystemProvider = ({
	children,
	theme,
}: DesignSystemProviderProps) => {
	return (
		<TokenProvider value={theme || DEFAULT_THEME}>{children}</TokenProvider>
	);
};

export const getCriticalAssets = () => {
	return {
		styles: extractStyles(),
	};
};
