/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// add uploadcare domain to the list
		domains: ["ucarecdn.com"],
	},
};

module.exports = nextConfig;
