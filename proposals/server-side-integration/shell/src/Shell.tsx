import Head from "next/head";
import {
	DesignSystemProvider,
	Typography,
	View,
} from "@framework/design-system";
import { ReactElement } from "react";
import { BrandConfiguration } from "./types";

type ShellProps = Pick<
	BrandConfiguration,
	"description" | "footer" | "theme" | "title"
> & {
	children: ReactElement;
};

export const Shell = ({
	children,
	description,
	footer,
	theme,
	title,
}: ShellProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content={description}
				/>
			</Head>
			<DesignSystemProvider theme={theme}>
				<Layout
					description={description}
					footer={footer}
				>
					{children}
				</Layout>
			</DesignSystemProvider>
		</>
	);
};

const Layout = ({
	children,
	description,
	footer,
}: Pick<ShellProps, "children" | "description" | "footer">) => {
	return (
		<View
			as="main"
			minHeight="100vh"
			alignItems="center"
			padding="spacing-24"
		>
			<Typography size="text-48">{description}</Typography>
			{children}
			{footer}
		</View>
	);
};
