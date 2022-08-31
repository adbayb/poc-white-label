import { Button, Link } from "@framework/design-system";

export const Application = () => {
	return (
		<>
			<Button
				onPress={() => console.log("event->click")}
				marginBottom={48}
			>
				Click me!
			</Button>
			<Link href="https://www.meilleursagents.com">Redirect me!</Link>
		</>
	);
};
