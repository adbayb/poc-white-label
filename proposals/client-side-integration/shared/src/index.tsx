import { ReactNode, createContext, useContext, useMemo, useState } from "react";

const CounterContext = createContext<{
	value: number;
	setValue: (value: number) => void;
}>({
	value: 0,
	setValue() {},
});

interface CounterProviderProps {
	children: ReactNode;
}

export const CounterProvider = (props: CounterProviderProps) => {
	const [value, setValue] = useState(0);
	const contextValue = useMemo(
		() => ({
			value,
			setValue,
		}),
		[value, setValue]
	);

	return (
		<CounterContext.Provider value={contextValue}>
			{props.children}
		</CounterContext.Provider>
	);
};

export const useCounter = () => {
	return useContext(CounterContext);
};
