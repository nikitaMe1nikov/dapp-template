const path = require('path')
const toPath = filePath => path.join(process.cwd(), filePath)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  features: {
    babelModeV7: true,
    storyStoreV7: true,
  },
  webpackFinal: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@emotion/core': toPath('node_modules/@emotion/react'),
        'emotion-theming': toPath('node_modules/@emotion/react'),
        public: toPath('public'),
        components: toPath('src/components'),
        containers: toPath('src/containers'),
        config: toPath('src/config'),
        pages: toPath('src/pages'),
        sagas: toPath('src/sagas'),
        stores: toPath('src/stores'),
        hooks: toPath('src/hooks'),
        types: toPath('src/types'),
        utils: toPath('src/utils'),
        queries: toPath('src/queries'),
        '@nimel/sdk': toPath('../sdk/src'),
      },
    },
    module: {
      ...config.module,
      rules: [
        {
          test: /\.(tsx|ts|js)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          include: /sdk|wagmi/,
        },
        {
          test: /\.(tsx|ts)?$/,
          loader: require.resolve('@open-wc/webpack-import-meta-loader'),
        },
        ...config.module.rules,
        {
          test: /\.(mjs)$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    node: {
      ...config.node,
      fs: 'empty',
    },
  }),
}
