// module.exports = require('../../babel.conf.js')
module.exports = {
  presets: [
    'next/babel',
    // [
    //   '@babel/preset-env',
    //   {
    //     modules: 'commonjs',
    //     useBuiltIns: 'usage',
    //     corejs: {
    //       version: '3',
    //       proposals: true,
    //     },
    //     // targets: 'last 4 Chrome versions',
    //   },
    // ],
    // [
    //   '@babel/preset-react',
    //   {
    //     runtime: 'automatic',
    //   },
    // ],
    // [
    //   '@babel/preset-typescript',
    //   {
    //     isTSX: true,
    //     allExtensions: true,
    //     onlyRemoveTypeImports: true,
    //     optimizeConstEnums: true,
    //     parserOpts: { strictMode: true },
    //   },
    // ],
  ],
  plugins: [
    '@emotion',
    // 'inline-react-svg',
    // ['styled-components', { ssr: true }],
    // 'const-enum',
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     regenerator: true,
    //   },
    // ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    // ...(isDev ? ['react-refresh/babel'] : []),
    'macros',
  ],
}
