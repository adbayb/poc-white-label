const Brand =
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require(`@server-side-integration/${process.env.BRAND_ID}`)
		.default as import("@server-side-integration/brand-factory").ConsumptionContract;

export const Shell = Brand.Shell;
export const RedirectionLink = Brand.RedirectionLink;
