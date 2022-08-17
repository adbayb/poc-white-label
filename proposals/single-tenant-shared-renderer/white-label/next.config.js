/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		TENANT_ID: process.env.TENANT_ID,
	},
};

module.exports = nextConfig;
