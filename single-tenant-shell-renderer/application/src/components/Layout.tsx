import type { ReactNode } from "react";
import { View } from "@framework/design-system";

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return <View as="main">{children}</View>;
};
