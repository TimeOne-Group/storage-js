import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json';

const banner = {
  banner() {
    return `/*! ${pkg.name} ${pkg.version} https://github.com/${pkg.homepage} @license ${pkg.license} */`;
  },
};

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'StorageJS',
      file: 'dist/index.js',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: babelLoaderExcludeNodeModulesExcept([
          'pako',
          '@timeone-group/error-logger-js',
        ]),
      }),
      banner,
    ],
  },
  {
    input: 'src/index.js',
    output: [{ file: 'dist/index.mjs', format: 'esm' }],
    plugins: [nodeResolve(), commonjs(), banner],
    external: ['pako', '@timeone-group/error-logger-js'],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        name: 'StorageJS',
        exports: 'named',
      },
    ],
    plugins: [nodeResolve(), commonjs(), banner],
    external: ['pako', '@timeone-group/error-logger-js'],
  },
];
