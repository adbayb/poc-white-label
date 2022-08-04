import { View, ViewSlot } from "../../primitives/View";

export interface CardProps {
	children: ViewSlot;
	size: "small" | "large";
}

export const Card = ({ children, size, ...restProps }: CardProps) => {
	return (
		<View
			{...restProps}
			as="article"
			backgroundColor="neutral-white"
			borderRadius="radius-4"
			padding="spacing-24"
			width="100%"
		>
			{children}
		</View>
	);
};
