import React, { createElement } from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { Application } from "./Application";

const lifecycle = singleSpaReact({
	React,
	ReactDOM,
	ReactDOMClient,
	rootComponent: Application,
	errorBoundary() {
		return createElement(
			"p",
			{},
			"This renders when a catastrophic error occurs"
		);
	},
});

export const bootstrap = lifecycle.bootstrap;
export const mount = lifecycle.mount;
export const unmount = lifecycle.unmount;
