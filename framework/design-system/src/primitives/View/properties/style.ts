import { css } from "coulis";
import {
	ColorTokenName,
	RadiusTokenName,
	ShadowTokenName,
	SpacingTokenName,
	TokenValue,
} from "../../tokens";

export interface StyleProps
	extends AnimationProps,
		BorderProps,
		ColorProps,
		DimensionProps,
		LayoutProps,
		MarginProps,
		PaddingProps,
		PositionProps {
	cursor?: "pointer";
	opacity?: number;
	shadow?: ShadowTokenName;
	overflow?: "visible" | "scroll" | "hidden";
	transform?: string;
	/**
	 * `visibility` controls the visibility of an element while keep the occupied space.
	 * It follows standard CSS value except for `visually-hidden` which is a special layout prop to hide visually an element
	 * while making it still accessible by non visual assistive technology (eg. screen readers):
	 */
	visibility?: "hidden" | "visible" | "visually-hidden";
}

export const mapStyleToPlatformAttributes = (
	{
		display = "flex",
		direction = "column",
		position,
		growFactor,
		shrinkFactor,
		shadow,
		// Colorable props
		color,
		backgroundColor,
		borderColor,
		// Dimensionable props
		spacing: gap,
		padding,
		paddingBottom,
		paddingTop,
		paddingLeft,
		paddingRight,
		margin,
		marginBottom,
		marginTop,
		marginLeft,
		marginRight,
		// Borderable props
		borderRadius,
		borderBottomLeftRadius,
		borderBottomRightRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		borderWidth,
		borderBottomWidth,
		borderLeftWidth,
		borderRightWidth,
		borderTopWidth,
		// Visibility props
		visibility,
		...restProps
	}: StyleProps,
	token: TokenValue
) => {
	const dimensionProps = mapTokenToPlatformAttributes(
		{
			gap,
			padding,
			paddingBottom,
			paddingTop,
			paddingLeft,
			paddingRight,
			margin,
			marginBottom,
			marginTop,
			marginLeft,
			marginRight,
		},
		token.spacings
	);

	const colorProps = mapTokenToPlatformAttributes(
		{
			color,
			backgroundColor,
			borderColor,
		},
		{ ...token.colors, transparent: "transparent" }
	);
	const radiusProps = mapTokenToPlatformAttributes(
		{
			borderRadius,
			borderBottomLeftRadius,
			borderBottomRightRadius,
			borderTopLeftRadius,
			borderTopRightRadius,
		},
		token.radius
	);
	const isVisuallyHidden = visibility === "visually-hidden";
	const visibilityProps = {
		visibility: isVisuallyHidden ? undefined : visibility,
		...(isVisuallyHidden && {
			clip: "rect(0 0 0 0)",
			clipPath: "inset(50%)",
			height: 1,
			overflow: "hidden",
			position: "absolute",
			whiteSpace: "nowrap",
			width: 1,
		}),
	};

	return {
		...restProps,
		...dimensionProps,
		...colorProps,
		...radiusProps,
		...visibilityProps,
		...mapBorderToPlatformAttributes({
			borderWidth,
			borderBottomWidth,
			borderLeftWidth,
			borderRightWidth,
			borderTopWidth,
		}),
		boxShadow: shadow ? token.shadows[shadow] : undefined,
		position: position ? position : shadow ? "relative" : undefined,
		display,
		flexDirection: direction,
		flexGrow: growFactor,
		flexShrink: shrinkFactor,
	} as Parameters<typeof css>[0];
};

const mapTokenToPlatformAttributes = <
	Props extends StyleProps,
	Tokens extends Record<string, string | number>
>(
	props: Props,
	tokens: Tokens
) => {
	const keys = Object.keys(props) as Array<keyof StyleProps>;

	return keys.reduce((cssObj, currentProp) => {
		const cssValue = props[currentProp];

		if (cssValue) {
			const tokenValue = tokens[cssValue];

			if (tokenValue !== undefined) {
				cssObj[currentProp] = tokenValue;
			} else {
				cssObj[currentProp] = cssValue;
			}
		}

		return cssObj;
	}, {} as Record<keyof Props, string | number>);
};

const mapBorderToPlatformAttributes = (props: StyleProps) => {
	// @note: borders behaviors:
	// border are applied if and only if a width is specified => acts as a stimulus to enable border.
	// - border(Side)Width => If no Side is provided (eg. no border(Left/Right/Bottom/Top)Width, eg. only borderWidth), border is applied on all sides.
	return (Object.keys(props) as Array<keyof StyleProps>).reduce(
		(cssValues, propertyName) => {
			const currentValue = props[propertyName];

			if (currentValue !== undefined) {
				cssValues[propertyName.replace("Width", "Style")] = "solid";
				cssValues[propertyName] = currentValue;
			}

			return cssValues;
		},
		{} as Record<string, string | number>
	);
};

type DimensionValue = number | string;

export interface AnimationProps {
	transition?: string | undefined;
}

export interface BorderProps {
	borderRadius?: RadiusTokenName | number | undefined;
	borderTopLeftRadius?: RadiusTokenName | number | undefined;
	borderTopRightRadius?: RadiusTokenName | number | undefined;
	borderBottomLeftRadius?: RadiusTokenName | number | undefined;
	borderBottomRightRadius?: RadiusTokenName | number | undefined;
	borderColor?: ColorTokenName | "transparent" | undefined;
	borderWidth?: DimensionValue | undefined;
	borderLeftWidth?: DimensionValue | undefined;
	borderRightWidth?: DimensionValue | undefined;
	borderTopWidth?: DimensionValue | undefined;
	borderBottomWidth?: DimensionValue | undefined;
}

export interface ColorProps {
	backgroundColor?: ColorTokenName | "transparent" | undefined;
	color?: ColorTokenName | "transparent" | undefined;
}

export interface DimensionProps {
	width?: DimensionValue | undefined;
	maxWidth?: DimensionValue | undefined;
	minWidth?: DimensionValue | undefined;
	height?: DimensionValue | undefined;
	maxHeight?: DimensionValue | undefined;
	minHeight?: DimensionValue | undefined;
	alignSelf?: LayoutProps["alignItems"] | undefined;
	growFactor?: number | undefined;
	shrinkFactor?: number | undefined;
}

export interface LayoutProps {
	alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | undefined;
	direction?: "row" | "column" | undefined;
	display?: "flex" | "grid" | undefined;
	flexWrap?: "wrap" | "nowrap" | undefined;
	spacing?: SpacingTokenName | number | undefined; // @note: the support is green even for flexbox layout on latest browsers
	justifyContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| undefined;
}

export interface MarginProps {
	margin?: SpacingTokenName | number | "auto" | undefined;
	marginBottom?: SpacingTokenName | number | "auto" | undefined;
	marginTop?: SpacingTokenName | number | "auto" | undefined;
	marginLeft?: SpacingTokenName | number | "auto" | undefined;
	marginRight?: SpacingTokenName | number | "auto" | undefined;
}

export interface PaddingProps {
	padding?: SpacingTokenName | number | "auto" | undefined;
	paddingBottom?: SpacingTokenName | number | "auto" | undefined;
	paddingTop?: SpacingTokenName | number | "auto" | undefined;
	paddingLeft?: SpacingTokenName | number | "auto" | undefined;
	paddingRight?: SpacingTokenName | number | "auto" | undefined;
}

export interface PositionProps {
	position?: "relative" | "absolute" | "fixed" | undefined;
	top?: number | undefined;
	bottom?: number | undefined;
	left?: number | undefined;
	right?: number | undefined;
	zIndex?: number | undefined;
}
