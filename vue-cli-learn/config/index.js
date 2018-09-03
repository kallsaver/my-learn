'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// 这个文件设置了开发和生产环境的资源目录

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  build: {
    // html-webpack-plugin的生成模板文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    // 打包出来文件的根目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 资源文件的根目录,js和css等
    assetsSubDirectory: 'static',
    // 资源文件的前缀
    assetsPublicPath: './',
    // 是否在生产环境开启sourceMap功能
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
  },

  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // can be overwritten by process.env.HOST
    // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    host: 'localhost',
    port: 3333,
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    autoOpenBrowser: true,
    notifyOnErrors: true,
    errorOverlay: true,
    // 代理配置
    proxyTable: {
      // '/api/xxx'将代理成https://m.weibo.cn/api/xxx
      // '/api': {
      //   target: 'https://m.weibo.cn',
      //   changeOrigin: true,
      //   logLevel: 'debug'
      // },

      // 如果接口没有inter,而你想使用inter
      '/inter': {
        target: 'https://m.weibo.cn/api',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {"^/inter" : ""}
      },
    },
  }
}




