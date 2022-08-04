import { css } from "coulis";
import {
	ElementType,
	ReactElement,
	ReactNode,
	cloneElement,
	forwardRef,
	isValidElement,
} from "react";
import { useToken } from "../tokens";
import {
	AccessibilityProps,
	mapAccessiblityToPlatformAttributes,
} from "./properties/accessibility";
import { StyleProps, mapStyleToPlatformAttributes } from "./properties/style";

export type ViewSlot = ReactNode;
export type ViewRef = HTMLElement;

export interface ViewProps extends AccessibilityProps, StyleProps {
	as?: ElementType | ReactElement;
	children?: ViewSlot;
	id?: string;
}

/**
 * The base Lego element: all other components are built upon it.
 *
 * Note regarding the platform prefix on mappers: for now, the only supported platform is web
 * but we can imagine to support later native apps (through react-native or whatever framework).
 * Decoupling properties from the rendering allows to adapt more easily future platform target needs.
 */
export const View = forwardRef<ViewRef, ViewProps>(function View(
	{
		as: Element = "div",
		children,
		id,
		accessibilityDescribedBy,
		accessibilityLabel,
		accessibilityRole,
		tabIndex,
		...restProps
	},
	ref
) {
	const token = useToken();
	const accessibilityProps = mapAccessiblityToPlatformAttributes({
		accessibilityDescribedBy,
		accessibilityLabel,
		accessibilityRole,
		tabIndex,
	});
	const className = css(mapStyleToPlatformAttributes(restProps, token));
	const commonProps = {
		...accessibilityProps,
		className,
		children,
		id,
	};

	if (isValidElement(Element)) {
		return cloneElement(Element, {
			...commonProps,
			className: Element.props.className
				? [className, Element.props.className].join(" ")
				: className,
			ref,
		});
	}

	return (
		<Element
			ref={ref}
			{...commonProps}
		>
			{children}
		</Element>
	);
});
