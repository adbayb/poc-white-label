import { useCounter } from "@client-side-integration/shared";

export const Application = () => {
	const { value, setValue } = useCounter();

	return (
		<div>
			<p>Hello from the white label</p>
			<button onClick={() => setValue(value + 1)}>Increment</button>
		</div>
	);
};
