import { ReactElement, ReactNode } from "react";
import {
	DesignSystemProvider,
	Link,
	TokenValue,
	Typography,
	View,
} from "@framework/design-system";

interface BrandFactoryProps {
	children: ReactNode;
	description: string;
	footer: ReactElement | null;
	redirectionLink: string;
	theme: TokenValue;
	title: string;
}

export const BrandFactory = ({
	children,
	description,
	footer,
	redirectionLink,
	theme,
}: // title,
BrandFactoryProps) => {
	return (
		<>
			{/* <Head>
				<title>{title}</title>
				<meta
					name="description"
					content={description}
				/>
			</Head> */}
			<DesignSystemProvider theme={theme}>
				<View
					as="main"
					minHeight="100vh"
					alignItems="center"
					padding="spacing-24"
				>
					<Typography size="text-48">{description}</Typography>
					{children}
					<Link href={redirectionLink}>Redirect me!</Link>
					{footer}
				</View>
			</DesignSystemProvider>
		</>
	);
};
