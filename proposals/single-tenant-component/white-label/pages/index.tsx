import type { NextPage } from "next";
import { Button } from "@framework/design-system";
import dynamic from 'next/dynamic';

const Shell = dynamic<any>(() => import(`@single-tenant-component/shells/${process.env.BRAND_ID}`).then((mod) => mod.Shell), {
  loading: () => <span>loading</span>,
})

const Home: NextPage = () => {
	return (
		<Shell>
			<Button>Click me!</Button>
		</Shell>
	);
};

export default Home;
