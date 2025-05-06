/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * This setting is required for Khulnasoft's Visual Editor to work with your site.
   */
  transpilePackages: ['@khulnasoft.com/sdk-react-nextjs'],
  experimental: {
    serverComponentsExternalPackages: ['isolated-vm'],
  },
};

module.exports = nextConfig;
