import type { NextPage } from "next";
import { Button } from "@framework/design-system";

const Home: NextPage = () => {
	return <Button onPress={() => console.log("event->click")}>Click me!</Button>;
};

export default Home;
