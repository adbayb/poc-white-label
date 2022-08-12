import Head from "next/head";
import { DesignSystemProvider, TokenValue } from "@framework/design-system";
import { ReactNode } from "react";

type ShellConfiguration = {
	title: string;
	description: string;
	theme: TokenValue;
};

export interface ShellProps {
	children: ReactNode;
}

export const createShell = (configuration: ShellConfiguration) => {
	return function Shell(props: ShellProps) {
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
	};
};
