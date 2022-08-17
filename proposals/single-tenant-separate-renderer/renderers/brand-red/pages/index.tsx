import { Typography } from "@framework/design-system";
import { Page } from "@single-tenant-separate-renderer/white-label-application";
import type { NextPage } from "next";
import { DESCRIPTION } from "../constants";

const Home: NextPage = () => {
	return (
		<Page
			titleSlot={<Typography size="text-48">{DESCRIPTION}</Typography>}
			redirectionLink="https://www.seloger.com/"
		/>
	);
};

export default Home;
