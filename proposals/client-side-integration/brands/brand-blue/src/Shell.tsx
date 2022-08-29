import { Suspense } from "react";
import { CounterProvider } from "@client-side-integration/shared";
// @ts-expect-error to fix typing
import { Renderer } from "white_label/Renderer";

export const Shell = () => {
	return (
		<CounterProvider>
			<p>Hello from brand-blue</p>
			<Suspense fallback="Loading modules...">
				<Renderer />
			</Suspense>
		</CounterProvider>
	);
};
