import { TextTokenName, useToken } from "../tokens";
import { View, ViewProps } from "../View";

export interface TypographyProps extends ViewProps {
	children: string | number;
	size?: TextTokenName;
	numberOfLines?: number;
	lineHeight?: number;
	variation?: "strong";
}

/**
 * The base Lego element for text like view
 */
export const Typography = ({
	children,
	size = "text-14",
	numberOfLines,
	lineHeight,
	variation,
	...restProps
}: TypographyProps) => {
	const token = useToken();
	const ellipsisProps = mapMaxLinesToStyleProps(numberOfLines);
	const isStrongVariation = variation === "strong";
	// @note: strong tag to foster semantic html
	const Element = isStrongVariation ? "strong" : "span";

	return (
		<View
			{...restProps}
			as={
				<Element
					// @note: title is set with ellipsis to let screen readers retrieve the original description (another alternative could be to use `aria-described-by`)
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
