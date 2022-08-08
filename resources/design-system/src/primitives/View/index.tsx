/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
	ElementType,
	FunctionComponentElement,
	ReactElement,
	ReactNode,
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
	const styles = mapStyleToPlatformAttributes(restProps, token);
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

	if (isValidElement(Element)) {
		return cloneElement(
			Element as FunctionComponentElement<Record<string, unknown>>,
			{
				...commonProps,
				css: styles,
				ref,
			}
		);
	}

	return (
		<Element
			{...commonProps}
			css={styles}
			ref={ref}
		>
			{children}
		</Element>
	);
});

const cloneElement = <Props extends Record<string, unknown>>(
	element: FunctionComponentElement<Props>,
	props: Props
) =>
	jsx(element.type, {
		key: element.key,
		ref: element.ref,
		...element.props,
		...props,
	});
