module.exports = {
  images: {
    domains: ['cdn.khulnasoft.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // This will allow site to be framed under khulnasoft.com for wysiwyg editing
          {
            key: 'Content-Security-Policy',
            value:
              'frame-ancestors https://*.khulnasoft.com https://khulnasoft.com http://localhost:9090 http://localhost:1234',
          },
        ],
      },
    ]
  },
}
