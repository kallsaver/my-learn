const path = require('path')

const typescript = require('@rollup/plugin-typescript')


const util = require('./util')
const version = require('../package.json').version
const name = require('../package.json').name
const apiName = util.createApiName(name)

const banner =
  '/*!\n' +
  ` * ${name}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} kallsave\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = (p) => {
  return path.resolve(__dirname, '../', p)
}

const plugins = [
  typescript({
    exclude: 'node_modules/**',
    typescript: require('typescript'),
  }),
]

const buildMap = {
  esm: {
    input: resolve('src/index.ts'),
    output: {
      file: resolve(`dist/${name}.esm.js`),
      format: 'esm',
      banner: banner
    },
    plugins: plugins,
  },
  main: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins: plugins,
  },
  min: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.min.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins: plugins,
  }
}

module.exports = buildMap
