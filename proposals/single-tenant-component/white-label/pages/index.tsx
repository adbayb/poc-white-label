import type { NextPage } from "next";
// @ts-expect-error fix exports typing
import { Shell } from "@single-tenant-component/shells/brand-red";
import { Button } from "@framework/design-system"

const Home: NextPage = () => {
	return (
		<Shell>
			<Button>Click me!</Button>
		</Shell>
	);
};

export default Home;
