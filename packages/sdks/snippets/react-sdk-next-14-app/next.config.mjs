/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.khulnasoft.com',
      },
    ],
  },
};

export default nextConfig;
