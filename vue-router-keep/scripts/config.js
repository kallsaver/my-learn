const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const flow = require('rollup-plugin-flow-no-whitespace')

const package = require('../package.json')

const version = package.version
const name = package.name

const banner =
  '/*!\n' +
  ` * ${name}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} kallsave\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = (p) => {
  return path.resolve(__dirname, '../', p);
}

const builds = {
  esm: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.esm.js`),
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
      file: resolve(`dist/${name}.umd.js`),
      format: 'umd',
      name: 'ViUpload',
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
      file: resolve('dist/vi-upload.min.js'),
      format: 'umd',
      name: 'ViUpload',
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
