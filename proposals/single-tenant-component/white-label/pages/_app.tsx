import "../styles/globals.css";
import type { AppProps } from "next/app";
/*
// @ts-expect-error test
import { Shell as RedShell } from "@single-tenant-component/shells/brand-red"
*/
import dynamic from 'next/dynamic';

// @ts-expect-error
const Shell = dynamic<any>(() => import(`@single-tenant-component/shells/brand-red`).then((mod) => mod.Shell), {
  loading: () => <span>loading</span>,
})

function MyApp({ Component, pageProps }: AppProps) {
	return <Shell><Component {...pageProps} /></Shell>;
}

export default MyApp;
