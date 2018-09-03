const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const getIPAdress = require('./get-ip-address')

const HOST = process.env.HOST = getIPAdress.getIPAdress()
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 开发环境不使用extract功能
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  devtool: config.dev.devtool,
  devServer: {
    // 只会在控制台打印告警,编译的过程信息不打印
    clientLogLevel: "warning",
    hot: true,
    // https://webpack.docschina.org/configuration/dev-server/#devserver-contentbase
    contentBase: false,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    publicPath: config.dev.assetsPublicPath,
    compress: true,
    // 代理配置
    proxy: config.dev.proxyTable,
    // 默认开启watch模式,poll毫秒轮询一次文件的变化
    watchOptions: {
      poll: 1000,
    },
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    quiet: true,
  },
  plugins: [

    // 热更新开启
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
