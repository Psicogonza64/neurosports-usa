import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: process.cwd(),
	},
	async redirects() {
		return [
			{
				source: "/research",
				destination: "/#research-preview",
				permanent: false,
			},
			{
				source: "/contact",
				destination: "/#contact",
				permanent: false,
			},
		];
	},
};

export default nextConfig;