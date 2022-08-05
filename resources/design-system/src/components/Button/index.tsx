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
	return (
		<View
			as={<button onClick={onPress} />}
			backgroundColor={`accent-${variation}`}
			borderRadius="radius-4"
			paddingBottom="spacing-24"
			paddingTop="spacing-24"
			paddingLeft="spacing-12"
			paddingRight="spacing-12"
		>
			{children}
		</View>
	);
};
