import { ReactElement } from "react";
import { TokenProvider, TokenValue } from "../primitives/tokens";
import { DEFAULT_THEME } from "../primitives/tokens/constants";

import "./resetStyles";

export type DesignSystemProviderProps = {
	children: ReactElement;
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
