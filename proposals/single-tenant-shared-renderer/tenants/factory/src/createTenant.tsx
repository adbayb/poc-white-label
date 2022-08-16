import Head from "next/head";
import { DesignSystemProvider, TokenValue } from "@framework/design-system";
import { ReactNode } from "react";

export type Contract = {
	Shell: (props: { children: ReactNode }) => JSX.Element;
};

type Configuration = {
	title: string;
	description: string;
	theme: TokenValue;
};

export const createTenant = (configuration: Configuration): Contract => {
	return {
		Shell: (props) => {
			return (
				<>
					<Head>
						<title>{configuration.title}</title>
						<meta
							name="description"
							content={configuration.description}
						/>
					</Head>
					<DesignSystemProvider theme={configuration.theme}>
						{props.children}
					</DesignSystemProvider>
					<footer>{configuration.description}</footer>
				</>
			);
		},
	};
};
