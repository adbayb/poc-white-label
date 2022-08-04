export interface AccessibilityProps {
	accessibilityDescribedBy?: string | undefined;
	accessibilityLabel?: string | undefined;
	accessibilityRole?: "img" | "presentation" | undefined;
	tabIndex?: number | undefined;
}

export const mapAccessiblityToPlatformAttributes = ({
	accessibilityDescribedBy,
	accessibilityLabel,
	accessibilityRole,
	tabIndex,
}: AccessibilityProps) => {
	return {
		"aria-describedby": accessibilityDescribedBy,
		"aria-label": accessibilityLabel,
		role: accessibilityRole,
		tabIndex,
	};
};
