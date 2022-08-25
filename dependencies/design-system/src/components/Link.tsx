import { Typography } from "../primitives/Typography";
import { View } from "../primitives/View";
import { MarginProps } from "../primitives/View/properties/style";

export interface LinkProps extends MarginProps {
	children: string;
	href: string;
	onPress?: () => void;
}

export const Link = ({ children, href, onPress, ...restProps }: LinkProps) => {
	return (
		<View
			{...restProps}
			as={
				<a
					href={href}
					onClick={onPress}
					target="_blank"
					rel="noopener noreferrer"
				/>
			}
			color="accent-primary"
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
