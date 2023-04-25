import type { TokenValue } from "@framework/design-system";
import type { ReactElement } from "react";

export type Api = {
	title: string;
	description: string;
	theme: TokenValue;
	redirectionLink: string;
	footer: ReactElement | null;
};
