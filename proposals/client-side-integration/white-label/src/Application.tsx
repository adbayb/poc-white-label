import { useCounter } from "@client-side-integration/shared";

export const Application = () => {
	const value = useCounter();

	return (
		<div>
			<p>Hello from the white label</p>
			<span>Counter = {value}</span>
		</div>
	);
};
