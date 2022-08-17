import { Button, Link } from "@framework/design-system";
import type { ReactElement } from "react";

interface PageProps {
	redirectionLink: string;
	titleSlot: ReactElement;
}

export const Page = ({ redirectionLink, titleSlot }: PageProps) => (
	<>
		{titleSlot}
		<Button
			onPress={() => console.log("event->click")}
			marginBottom={48}
		>
			Click me!
		</Button>
		<Link href={redirectionLink}>Redirect me!</Link>
	</>
);
