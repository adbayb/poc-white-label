import Head from "next/head";
import {
	DesignSystemProvider,
	Link,
	LinkProps,
	TokenValue,
	Typography,
	View,
} from "@framework/design-system";
import { ReactElement, ReactNode } from "react";

export type Contract = {
	Shell: (props: { children: ReactNode }) => JSX.Element;
	RedirectionLink: ReturnType<typeof createRedirectionLink>;
};

type Configuration = {
	title: string;
	description: string;
	theme: TokenValue;
	footer: ReactElement | null;
	redirectionLink: string;
};

export const createTenant = (configuration: Configuration): Contract => {
	const Layout = createLayout(configuration);
	const RedirectionLink = createRedirectionLink(configuration);

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
		RedirectionLink,
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
				<Typography size="text-48">{configuration.description}</Typography>
				{children}
				{configuration.footer}
			</View>
		);
	};

type RedirectionLinkProps = Pick<LinkProps, "children">;

const createRedirectionLink = (configuration: Configuration) =>
	function RedirectionLink({ children }: RedirectionLinkProps) {
		return <Link href={configuration.redirectionLink}>{children}</Link>;
	};
