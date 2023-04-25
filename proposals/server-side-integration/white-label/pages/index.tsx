import type { NextPage } from "next";
import { Button, Link } from "@framework/design-system";
import { configuration } from "@server-side-integration/shell";

const Home: NextPage = () => {
	return (
		<>
			<Button
				onPress={() => console.log("event->click")}
				marginBottom={48}
			>
				Click me!
			</Button>
			<Link href={configuration.redirectionLink}>Redirect me!</Link>
		</>
	);
};

export default Home;
