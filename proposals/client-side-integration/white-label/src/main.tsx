import React from "react";
import ReactDOM from "react-dom/client";
import { Renderer } from "./Renderer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Renderer />
	</React.StrictMode>
);
