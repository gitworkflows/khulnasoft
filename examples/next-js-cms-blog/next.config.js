module.exports = {
  images: {
    domains: ['cdn.khulnasoft.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://*.khulnasoft.com https://khulnasoft.com http://localhost:1234',
          },
        ],
      },
    ];
  },
};
