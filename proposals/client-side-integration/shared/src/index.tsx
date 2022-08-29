import { ReactNode, createContext, useContext } from "react";

const CounterContext = createContext(0);

interface CounterProviderProps {
	children: ReactNode;
}

export const CounterProvider = (props: CounterProviderProps) => {
	return (
		<CounterContext.Provider value={0}>
			{props.children}
		</CounterContext.Provider>
	);
};

export const useCounter = () => {
	return useContext(CounterContext);
};
