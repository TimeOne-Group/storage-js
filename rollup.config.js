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

const external = ['@timeone-group/error-logger-js'];

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
        exclude: babelLoaderExcludeNodeModulesExcept(external),
      }),
      banner,
    ],
  },
  {
    input: 'src/index.js',
    output: [{ file: 'dist/index.mjs', format: 'esm' }],
    plugins: [nodeResolve(), commonjs(), banner],
    external,
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
    external,
  },
];
