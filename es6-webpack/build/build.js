const path = require('path')
const glob = require('glob-all')
const treeify = require('treeify')
const merge = require('merge')
const webpack = require('webpack')
const chalk = require('chalk')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 使用npm run build会打包所有文件夹的文件

// 如果要打包某一个文件夹中的文件请使用命令
// cross-env先全局安装
// cross-env F=文件夹名 npm run build

// 封装一个绝对路径的方法跳出build文件夹
let resolve = dir => {
  // path.join相当于在当前目录cd.. 然后cd dir这样
  return path.join(__dirname, '..', dir)
}

// 深度合并,前者的value会被后者覆盖
let deepClone = (source, target) => {
  return merge(true, source, target)
}

// 打印
let tree = obj => {
  if (typeof obj !== 'object') {
    console.log(obj)
    return
  }
  console.log(treeify.asTree(obj, true))
}

// 多页的入口文件必须是index.js
let files = glob.sync([
  resolve('learn/**/src/index.js'),
])

console.log(process.env.F)

let entry = {}

if (process.env.F) {
  let folder = process.env.F
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let reg = new RegExp('.*?\/learn\/' + folder + '\/.*')
    if (reg.test(file)) {
      entry[folder] = file
      console.log(chalk.yellow('building for ' + folder + '....'))
      break
    }
  }

  if (!entry[folder]) {
    console.log(chalk.red('文件夹名字输入错误'))
    process.exit()
  }

}else {
  files.forEach((file) => {
    let folder = file.replace(/.*?\/learn\/(.*?)\/.*/, '$1')
    entry[folder] = file
  })
  console.log(chalk.yellow('building all folder'))
}

let webpackConfig = baseConfig(entry)


// Object.keys(entry).forEach((name) => {
//     let plugin = new HtmlWebpackPlugin({
//         // filename是相对于output.path路径的
//         filename: name + '/dist/' + 'index.html',
//         // template是相对根目录,使用同一个模板
//         template: 'index.html',
//         inject: false,
//         //hash: true,
//     })

//     webpackConfig.plugins.push(plugin)
// })

webpack(webpackConfig, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    // 不打印处理了哪些模块
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
  '  Tip: built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
  ))
})



















