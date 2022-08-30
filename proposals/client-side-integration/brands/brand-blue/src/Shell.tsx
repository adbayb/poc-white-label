import { Suspense } from "react";
import { CounterProvider, useCounter } from "@client-side-integration/shared";
// @ts-expect-error to fix typing
import { Renderer } from "white_label/Renderer";

const Counter = () => {
	const { value } = useCounter();

	return <span>Counter = {value}</span>;
};

export const Shell = () => {
	return (
		<CounterProvider>
			<p>Hello from brand-blue</p>
			<Suspense fallback="Loading modules...">
				<Counter />
				<Renderer />
			</Suspense>
		</CounterProvider>
	);
};
