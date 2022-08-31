import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import {
	DesignSystemProvider,
	TokenValue,
	Typography,
	View,
} from "@framework/design-system";

interface BrandFactoryProps {
	children: ReactNode;
	description: string;
	theme: TokenValue;
	title: string;
}

export const BrandFactory = ({
	children,
	description,
	theme,
	title,
}: BrandFactoryProps) => {
	return (
		<>
			<Helmet>
				<title>{title}</title>
				<meta
					name="description"
					content={description}
				/>
			</Helmet>
			<DesignSystemProvider theme={theme}>
				<View
					as="main"
					minHeight="100vh"
					alignItems="center"
					padding="spacing-24"
				>
					<Typography size="text-48">{description}</Typography>
					{children}
				</View>
			</DesignSystemProvider>
		</>
	);
};
