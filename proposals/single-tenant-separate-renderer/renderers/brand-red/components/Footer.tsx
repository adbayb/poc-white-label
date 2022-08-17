import { Typography, View } from "@framework/design-system";

export const Footer = () => {
	return (
		<View
			as="footer"
			position="fixed"
			bottom={0}
			left={0}
			right={0}
			height={100}
			backgroundColor="accent-secondary"
			alignItems="center"
			justifyContent="center"
		>
			<Typography variation="strong">Footer</Typography>
		</View>
	);
};
