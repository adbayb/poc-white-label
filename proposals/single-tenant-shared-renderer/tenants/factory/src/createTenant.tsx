import Head from "next/head";
import {
	DesignSystemProvider,
	TokenValue,
	Typography,
	View,
} from "@framework/design-system";
import { ReactElement, ReactNode } from "react";

export type Contract = {
	Shell: (props: { children: ReactNode }) => JSX.Element;
};

type Configuration = {
	title: string;
	description: string;
	theme: TokenValue;
	footer: ReactElement | null;
};

export const createTenant = (configuration: Configuration): Contract => {
	const Layout = createLayout(configuration);

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
						<Layout>{props.children}</Layout>
					</DesignSystemProvider>
				</>
			);
		},
	};
};

interface LayoutProps {
	children: ReactNode;
}

const createLayout = (configuration: Configuration) =>
	function Layout({ children }: LayoutProps) {
		return (
			<View
				as="main"
				minHeight="100vh"
				alignItems="center"
				padding="spacing-24"
			>
				<Typography size="text-36">{configuration.description}</Typography>
				{children}
				{configuration.footer}
			</View>
		);
	};
