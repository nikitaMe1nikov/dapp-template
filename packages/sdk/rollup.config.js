/**
 * @type {import('rollup').RollupOptions}
 */
// eslint-disable import/no-extraneous-dependencies
import dts from 'rollup-plugin-dts'
// import('rollup')
// import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import del from 'rollup-plugin-delete'
import externals from 'rollup-plugin-node-externals'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        // inlineDynamicImports: true,
        // sourcemap: true,
        // exports: 'default',
        plugins: [terser()],
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        // inlineDynamicImports: true,
        // sourcemap: true,
        // exports: 'default',
        plugins: [terser()],
      },
    ],
    plugins: [
      json({ compact: true }),
      externals(),
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'], preferBuiltins: true }),
      commonjs({ ignoreGlobal: true, include: ['node_modules/**'], extensions: ['.js', '.json'] }),
      // esbuild({
      //   target: 'es2017',
      //   tsconfig: 'tsconfig.json',
      //   minify: process.env.NODE_ENV === 'production',
      //   // loaders: {
      //   //   // Add .json files support
      //   //   // require @rollup/plugin-commonjs
      //   //   '.json': 'json',
      //   //   // Enable JSX in .js files too
      //   //   // '.js': 'jsx',
      //   //   // '.ts': 'tsx',
      //   // },
      // }),
      babel({
        babelHelpers: 'runtime',
        // configFile: 'babel.config.js',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        exclude: 'node_modules/**',
      }),
      del({ targets: 'dist/*' }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        // __buildDate__: () => JSON.stringify(new Date()),
        // __buildVersion: 15
      }),
    ],
    external: [/@babel\/runtime/],
  },
  {
    input: './src/index.ts',
    // plugins: [dts()],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    // plugins: [json(), commonjs(), nodeResolve()],
    plugins: [
      // externals(),
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'], preferBuiltins: true }),
      dts(),
    ],
    external: [/\.json/],
  },
]
