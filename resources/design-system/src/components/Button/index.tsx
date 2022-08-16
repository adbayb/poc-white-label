import { ColorTokenName } from "../../primitives/tokens";
import { Typography } from "../../primitives/Typography";
import { View } from "../../primitives/View";

export interface ButtonProps {
	children: string;
	onPress?: () => void;
	variation?: "primary" | "secondary";
}

export const Button = ({
	children,
	onPress,
	variation = "primary",
}: ButtonProps) => {
	const color: ColorTokenName = `accent-${variation}`;

	return (
		<View
			as={<button onClick={onPress} />}
			backgroundColor="transparent"
			borderColor={color}
			borderRadius={12}
			borderWidth={3}
			color={color}
			paddingBottom="spacing-12"
			paddingTop="spacing-12"
			paddingLeft="spacing-16"
			paddingRight="spacing-16"
		>
			<Typography
				variation="strong"
				size="text-14"
			>
				{children}
			</Typography>
		</View>
	);
};
