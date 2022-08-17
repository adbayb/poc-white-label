import type { NextPage } from "next";
import { Button } from "@framework/design-system";
import { RedirectionLink } from "../components/TenantProxy";

const Home: NextPage = () => {
	return (
		<>
			<Button
				onPress={() => console.log("event->click")}
				marginBottom={48}
			>
				Click me!
			</Button>
			<RedirectionLink>Redirect me!</RedirectionLink>
		</>
	);
};

export default Home;
