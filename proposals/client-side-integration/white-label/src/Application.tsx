import { Helmet } from "react-helmet";
import {
	Button,
	DesignSystemProvider,
	Link,
	Typography,
	View,
} from "@framework/design-system";
import type { ConfigurationContract } from "../types/Contract";

export const Application = ({
	description,
	footer,
	redirectionLink,
	theme,
	title,
}: ConfigurationContract) => {
	return (
		<DesignSystemProvider theme={theme}>
			<Helmet>
				<title>{title}</title>
				<meta
					name="description"
					content={description}
				/>
			</Helmet>
			<View
				as="main"
				minHeight="100vh"
				alignItems="center"
				padding="spacing-24"
			>
				<Typography size="text-48">{description}</Typography>
				<Button
					onPress={() => console.log("event->click")}
					marginBottom={48}
				>
					Click me!
				</Button>
				<Link href={redirectionLink}>Redirect me!</Link>
				{footer}
			</View>
		</DesignSystemProvider>
	);
};
