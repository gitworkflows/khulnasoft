/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.khulnasoft.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // this will allow site to be framed under khulnasoft.com for wysiwyg editing
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://*.khulnasoft.com https://khulnasoft.com http://localhost:1234',
          },
        ],
      },
    ];
  },
};
