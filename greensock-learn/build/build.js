process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackConfigFn = require('./webpack.config')
const config = require('../config')
const ora = require('ora')
const chalk = require('chalk')

const spinner = ora('building for production...')
spinner.start()

// 本次打包的目录
let buildDirectors = config.build.buildDirectors

buildDirectors.forEach((buildDirector) => {

  let webpackConfig = webpackConfigFn(buildDirector)

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
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

})
