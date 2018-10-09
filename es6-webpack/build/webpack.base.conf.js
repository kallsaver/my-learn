const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let resolve = dir => {
  // path.join相当于在当前目录cd.. 然后cd dir这样
  return path.join(__dirname, '..', dir)
}

module.exports = function (entry) {
  return {
    entry: entry,
    output: {
      path: resolve('learn'),
      publicPath: resolve('learn'),
      filename: '[name]/dist/[name].bundle.js',
    },
    resolve: {
      // import后缀省略
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [resolve('node_modules')],
          include: [resolve('learn'), resolve('util')],
          use: {
            loader: 'babel-loader'
          },
        }
      ]
    },
    // 开发环境推荐cheap-module-source-map
    devtool: 'source-map',
    // 自带监听文件改变刷新浏览器效果,但是不是hot模块热替换
    devServer: {
      // 文件改变不会刷新浏览器,而是执行模块热更新
      // 一般不选true,因为选了true说明整个项目都做了热更新处理,不然会有一堆信息出来
      //hotOnly: true,
      // 热更新需要loader
      hot: true,
      contentBase: path.resolve(__dirname),
      port: 8899,
      // 是否自动打开浏览器,和命令行中使用--open是一样的
      open: true,
      // 浏览器上也可以看到gitbash的错误
      overlay: true,
      historyApiFallback: false,
      // 使用webpack-dev-server时的资源前缀,可以把output的publicPath冲掉
      //publicPath: '/',
      quiet: true,
      // 默认开启watch模式,poll毫秒轮询一次文件的变化
      watchOptions: {
        poll: 1000,
      },
      overlay: {
        warnings: false,
        errors: true
      }
    },
    plugins: [

    ],
    node: {
      global: true,
    }
  }
}
