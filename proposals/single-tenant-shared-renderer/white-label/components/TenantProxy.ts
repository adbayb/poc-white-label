const Tenant = require(`@single-tenant-shared-renderer/white-label-tenant-${process.env.BRAND_ID}`)
	.default as import("@single-tenant-shared-renderer/white-label-tenant-factory").Contract;

export const Shell  = Tenant.Shell