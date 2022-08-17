import { TextTokenName, useToken } from "./tokens";
import { View, ViewProps } from "./View";

export interface TypographyProps extends ViewProps {
	children: string | number;
	size?: TextTokenName;
	numberOfLines?: number;
	lineHeight?: number;
	variation?: "strong";
}

export const Typography = ({
	as,
	children,
	size = "text-14",
	numberOfLines,
	lineHeight = 1.55,
	variation,
	...restProps
}: TypographyProps) => {
	const token = useToken();
	const ellipsisProps = mapMaxLinesToStyleProps(numberOfLines);
	const isStrongVariation = variation === "strong";
	const Element =
		typeof as === "string" ? as : isStrongVariation ? "strong" : "span";

	return (
		<View
			{...restProps}
			as={
				<Element
					title={ellipsisProps ? String(children) : undefined}
					style={{
						...ellipsisProps,
						wordBreak: "break-word",
						fontSize: token.texts[size],
						fontWeight: isStrongVariation ? 700 : 400,
						lineHeight,
					}}
				/>
			}
		>
			{children}
		</View>
	);
};

const mapMaxLinesToStyleProps = (
	numberOfLines: TypographyProps["numberOfLines"]
) => {
	if (!numberOfLines) {
		return;
	}

	return {
		WebkitLineClamp: numberOfLines,
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	} as const;
};
