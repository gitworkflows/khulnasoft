/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/product/category/:handle',
        destination: '/product-details/product/category/:handle',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.khulnasoft.com',
      },
    ],
  },
};

export default nextConfig;
