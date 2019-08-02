const path = require('path')
// rollup编译es6代码的一个库,编译功能不是很全
const buble = require('rollup-plugin-buble')
// 类似webpack的别名
const alias = require('rollup-plugin-alias')
// 在webpack中,ES Module和CommonJs和AMD都是可以互转的,这是webpack自带的实现
// 在rollup中,需要使用rollup-plugin-node-resolve和rollup-plugin-commonjs让ES Module和CommonJs互转
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
// 去除flow静态类型检查代码
const flow = require('rollup-plugin-flow-no-whitespace')

const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const aliases = require('./alias')

const resolve = p => {
  const base = p.split('/')[0]
  // 如果路径存在aliase,解析出完整的路径
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds = {
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only ES modules build (for bundlers)
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
}

function genConfig(name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    // onwarn: (msg, warn) => {
    //   if (!/Circular/.test(msg)) {
    //     warn(msg)
    //   }
    // }
  }

  // 如果配置项transpile为false,不需要转es5
  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  // Object.defineProperty默认配置,不可枚举修改无效
  Object.defineProperty(config, '_name', {
    // enumerable: false,
    value: name
  })

  return config
}


if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
