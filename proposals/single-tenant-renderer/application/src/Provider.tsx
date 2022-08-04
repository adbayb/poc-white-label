import type { ReactNode } from "react";
import { DesignSystemProvider } from "@framework/design-system";
import { Layout } from "./components/Layout";

interface ProviderProps {
	children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
	return (
		<DesignSystemProvider>
			<Layout>{children}</Layout>
		</DesignSystemProvider>
	);
};
