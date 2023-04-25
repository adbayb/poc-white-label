import { ReactElement } from "react";
import { TokenValue } from "@framework/design-system";

export type BrandConfiguration = {
	description: string;
	footer: ReactElement | null;
	theme: TokenValue;
	title: string;
	redirectionLink: string;
};
