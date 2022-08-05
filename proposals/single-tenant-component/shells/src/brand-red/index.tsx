import { ShellProps } from "../types";

export const Shell = ({ children }: ShellProps) => {
	return (
		<>
			{children}
			<span>Blue</span>
		</>
	);
};
