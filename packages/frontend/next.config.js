const isProd = process.env.NODE_ENV === 'production'
const TerserPlugin = require('terser-webpack-plugin') // eslint-disable-line import/no-extraneous-dependencies
const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'cdn-images-1.medium.com',
      'ipfs.io',
      'gateway.moralisipfs.com',
      'ipfs.moralis.io',
      'gameficore.s3.eu-west-2.amazonaws.com',
    ],
    minimumCacheTTL: 31_536_000,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  // experimental: {
  //   externalDir: true,
  // },
  // rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/api/landing',
  //     },
  //     {
  //       source: '/investors',
  //       destination: '/api/investors',
  //     },
  //   ]
  // },
  webpack(config, _options) {
    config.module.rules.push(
      {
        test: /.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 120_000,
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: /sdk\/src/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
            ignore: ['node_modules'],
          },
        },
      },
    )

    config.optimization.minimizer[0] = new TerserPlugin({
      parallel: true,
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true,
      },
    })

    return config
  },
  redirects() {
    return [
      ...(isProd
        ? [
            {
              source: '/testing',
              destination: '/',
              permanent: true,
            },
          ]
        : []),
    ]
  },
  env: {
    API_URL: process.env.API_URL,
    MOCK: process.env.MOCK,
  },
  i18n,
}
