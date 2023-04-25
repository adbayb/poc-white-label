import { ReactElement } from "react";
import { Shell } from "./Shell";
import { BrandConfiguration } from "./types";

/**
 * Brand factory
 * @param BrandConfiguration settings
 * @returns brand-specific configuration and assets
 */
export const createBrand = (configuration: BrandConfiguration) => {
	return {
		configuration,
		Shell: ({ children }: { children: ReactElement }) => {
			return (
				<Shell
					description={configuration.description}
					footer={configuration.footer}
					theme={configuration.theme}
					title={configuration.title}
				>
					{children}
				</Shell>
			);
		},
	};
};
