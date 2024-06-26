/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})
    // config.module.rules.push({
		// 	test: /\.(png|gif|woff|woff2|eot|ttf)$/,
		// 	loader: 'url-loader',
		// })
		config.module.rules.push({
			test: /\.(png|gif|jpg|jpeg)$/,
			loader: 'file-loader',
		})
		return config
	},
  images: {
    remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			}
		]
  }
}

module.exports = nextConfig
