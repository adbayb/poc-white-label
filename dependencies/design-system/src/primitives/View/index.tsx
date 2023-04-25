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
	const styles = css(
		mapStyleToPlatformAttributes(restProps, token) as Parameters<typeof css>[0]
	);
	const accessibilityProps = mapAccessiblityToPlatformAttributes({
		accessibilityDescribedBy,
		accessibilityLabel,
		accessibilityRole,
		tabIndex,
	});
	const commonProps = {
		...accessibilityProps,
		children,
		id,
	};

	if (isValidElement<any>(Element)) {
		return cloneElement(Element, {
			...commonProps,
			className: styles,
			ref,
		});
	}

	return (
		<Element
			{...commonProps}
			className={styles}
			ref={ref}
		>
			{children}
		</Element>
	);
});
