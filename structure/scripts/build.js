const chalk = require('chalk')
const yargsParser = require('yargs-parser')
const chokidar = require('chokidar')
const execa = require('execa')
const wepyCompile = require('wepy-cli/lib/compile').default
const { distDir, wxdevtools } = require('./utils')

const cwd = process.cwd()
const env = Object.assign({}, process.env)
const argv = yargsParser(process.argv, {
  alias: {
    file: 'f',        // 待编译wpy文件
    help: 'h',        // 帮助
    watch: 'w',       // 监听文件改动
    source: 's',      // 源码目录
    target: 't',      // 生成代码目录
    output: 'o',      // 编译类型：web，weapp。默认为weapp
    platform: 'p'     // 编译平台：browser, wechat，qq。默认为browser
  }
})

async function build(options) {
  if (wepyCompile.init(options)) {
    wepyCompile.build(options)
  }

  await new Promise((resolve, reject) => {
    chokidar.watch(distDir, { ignored: /npm/i }).on('ready', () => {
      console.log(chalk`{yellow 正在打开} {cyan [微信开发者工具]}`)
      execa(wxdevtools, ['-o', distDir], {
        cwd,
        env,
        stdio: 'ignore'
      })
      .then(value => resolve(value))
      .catch(error => reject(error))
    })
  })
}

if (!module.parent) {
  build(argv)
} else {
  module.exports = (args = argv) => build(args)
}
