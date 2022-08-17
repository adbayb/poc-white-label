import { useState } from "react";
import { ColorTokenName } from "../primitives/tokens";
import { Typography } from "../primitives/Typography";
import { View } from "../primitives/View";
import { MarginProps } from "../primitives/View/properties/style";

export interface ButtonProps extends MarginProps {
	children: string;
	onPress?: () => void;
	variation?: "primary" | "secondary";
}

export const Button = ({
	children,
	onPress,
	variation = "primary",
	...restProps
}: ButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const colorByVariation: ColorTokenName = `accent-${variation}`;

	return (
		<View
			{...restProps}
			as={
				<button
					onClick={onPress}
					onPointerEnter={() => setIsHovered(true)}
					onPointerLeave={() => setIsHovered(false)}
					onPointerDown={() => setIsActive(true)}
					onPointerUp={() => setIsActive(false)}
				/>
			}
			transition="background-color 500ms"
			backgroundColor={
				isActive
					? "accent-primary"
					: isHovered
					? "accent-secondary"
					: "transparent"
			}
			borderColor={colorByVariation}
			borderRadius={12}
			borderWidth={3}
			color={isActive ? "neutral-white" : colorByVariation}
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
