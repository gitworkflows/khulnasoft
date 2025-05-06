const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = bundleAnalyzer({
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
            value: 'frame-ancestors https://*.khulnasoft.com https://khulnasoft.com',
          },
        ],
      },
    ]
  },
  env: {
    // expose env to the browser
    KHULNASOFT_PUBLIC_KEY: process.env.KHULNASOFT_PUBLIC_KEY,
  },
})
