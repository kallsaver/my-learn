const path = require('path');
const buble = require('rollup-plugin-buble');
const babel = require('rollup-plugin-babel');
const node = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const minify = require('rollup-plugin-babel-minify');
const eslint = require('rollup-plugin-eslint').eslint;

const { resolve } = require('./utils')

const builds = {
  esm: {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/better-scroll.esm.js'),
      format: 'es',
    },
    plugins: [
      eslint({
        include: [
          resolve('src/**/*.js')
        ]
      }),
      node(),
      cjs(),
    ]
  },
  umd: {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/better-scroll.umd.js'),
      format: 'umd',
      name: 'BScroll',
    },
    plugins: [
      eslint({
        include: [
          resolve('src/**/*.js')
        ]
      }),
      node(),
      cjs(),
      buble(),
      babel({
        plugins: ['external-helpers'],
      }),
    ]
  },
  min: {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/better-scroll.min.js'),
      format: 'umd',
      name: 'BScroll',
    },
    plugins: [
      eslint({
        include: [
          resolve('src/**/*.js')
        ]
      }),
      node(),
      cjs(),
      // buble(),
      babel({
        plugins: ['external-helpers'],
      }),
      minify(),
    ]
  }
}

function genConfig(name) {
  const options = builds[name];
  let config = {
    input: options.input,
    output: options.output,
    plugins: options.plugins,
  };
  return config;
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET);
} else {
  exports.getBuild = genConfig;
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}
