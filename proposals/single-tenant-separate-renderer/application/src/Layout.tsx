import type { ReactNode } from "react";
import { View } from "@framework/design-system";

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<View
			as="main"
			minHeight="100vh"
			alignItems="center"
			padding="spacing-24"
		>
			{children}
		</View>
	);
};
