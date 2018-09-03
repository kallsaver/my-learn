const path = require('path')

const buble = require('rollup-plugin-buble')

// 在webpack中,ES Module和CommonJs和AMD都是可以互转的,这是webpack自带的实现
// 在rollup中,需要使用rollup-plugin-node-resolve和rollup-plugin-commonjs让ES Module和CommonJs互转
// rollup-plugin-node-resolve默认了常用配置
// https://github.com/rollup/rollup-plugin-node-resolve
const node = require('rollup-plugin-node-resolve')
// rollup-plugin-commonjs默认了常用配置
const cjs = require('rollup-plugin-commonjs')

const resolve = p => {
  return path.resolve(__dirname, '../', p)
}

const builds = {
  cjs: {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/learn.common.js'),
      // CommondJs
      format: 'cjs'
    },
    plugins: [
      node(),
      cjs(),
    ]
  },
  esm: {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/learn.esm.js'),
      // ES Module
      format: 'es'
    },
    plugins: [
      node(),
      cjs(),
    ]
  },
  umd: {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/learn.umd.js'),
      // 直接引入
      format: 'umd',
      // 'umd'模式是运行在浏览器上的,作为全局变量
      name: 'learn',
    },
    plugins: [
      node(),
      cjs(),
      buble()
    ]
  }
}

function genConfig(name) {
  const options = builds[name]

  var config = {
    input: options.input,
    output: options.output,
    plugins: options.plugins,
  }

  // getAllBuilds = () => Object.keys(builds).map(genConfig)会变成一个数组,补上名字
  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  // exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
