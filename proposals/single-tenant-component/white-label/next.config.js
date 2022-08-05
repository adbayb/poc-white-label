/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		BRAND_ID: process.env.BRAND_ID,
	},
};

module.exports = nextConfig;
