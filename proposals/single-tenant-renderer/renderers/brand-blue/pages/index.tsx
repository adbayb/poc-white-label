import { RootPage } from "@single-tenant-renderer/white-label-application";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<RootPage />
		</>
	);
};

export default Home;