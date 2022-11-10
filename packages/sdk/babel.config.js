module.exports = {
  presets: [
    ['@babel/preset-env'],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    'macros',
  ],
}
