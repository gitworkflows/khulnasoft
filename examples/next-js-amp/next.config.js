const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
});

module.exports = bundleAnalyzer({
  target: 'serverless',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              'frame-ancestors https://*.khulnasoft.com https://khulnasoft.com http://localhost:1234',
          },
        ],
      },
    ];
  },
  env: {
    // expose env to the browser
    KHULNASOFT_PUBLIC_KEY: process.env.KHULNASOFT_PUBLIC_KEY,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
});
