import { View, ViewSlot } from "../../primitives/View";

export interface BadgeProps {
	children: ViewSlot;
	variation?: "primary" | "secondary";
}

export const Badge = ({ children, variation }: BadgeProps) => {
	const isPrimaryVariation = variation === "primary";

	return (
		<View
			padding="spacing-10"
			direction="row"
			spacing="spacing-10"
			alignItems="center"
			backgroundColor={
				isPrimaryVariation ? "accent-primary" : "accent-secondary"
			}
			borderRadius="radius-8"
			color="neutral-white"
		>
			{children}
		</View>
	);
};
