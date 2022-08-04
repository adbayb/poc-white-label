import { View, ViewProps, ViewSlot } from "../../primitives/View";

export interface CardProps {
	children: ViewSlot;
	size: "small" | "large";
}

export const Card = ({ children, size, ...restProps }: CardProps) => {
	return (
		<View
			{...restProps}
			{...paddingMapping[size]}
			as="article"
			backgroundColor="neutral-white"
			width="100%"
			borderRadius="radius-2"
		>
			{children}
		</View>
	);
};

const paddingMapping: Record<
	CardProps["size"],
	Pick<
		ViewProps,
		| "padding"
		| "paddingBottom"
		| "paddingLeft"
		| "paddingRight"
		| "paddingTop"
	>
> = {
	small: {
		padding: "spacing-24",
		paddingBottom: "spacing-16",
	},
	large: {
		padding: "spacing-32",
		paddingBottom: "spacing-24",
	},
};
