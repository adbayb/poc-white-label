const Brand =
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require(`@single-tenant-shared-renderer/white-label-brand-${process.env.BRAND_ID}`)
		.default as import("@single-tenant-shared-renderer/white-label-brand-factory").ConsumptionContract;

export const Shell = Brand.Shell;
export const RedirectionLink = Brand.RedirectionLink;
