// 生产和测试环境都用npm run build来打包,
// 依赖build.js和webpack.prod.conf.js,测试环境和生产环境的通过环境变量来控制
// 生产和测试都依赖于build.js和webpack.prod.js,不同的是test.env.js和prod.env.js
// 开发环境用npm run dev来调试开发
// 生产和测试和开发环境都依赖webpack.base.js,使用merge的包扩展修改webpack.base.js的配置
// webpack.base.conf.js是一些提取出webpack.prod.conf.js和weback.dev.conf.js的配置

const path = require('path')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')


// 跳出build文件夹
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // context用于设置根目录,
  // 影响到entry和loader使用相对路径时要以根目录为参考,
  context: path.resolve(__dirname, '../'),
  // 最好使用绝对路径来配置
  entry: {
    app: resolve('src/main.js'),
  },
  output: {
    // webpack打包生成文件的根目录
    path: config.build.assetsRoot,
    filename: '[name].js',
    // 如果是生产环境的使用生产环境的cdn资源前缀,
    // 如果是开发环境的使用开发环境的cdn资源前缀
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 使用import请求路径时的处理,
  resolve: {
    // import xxx from 'xxx',先匹配xxx.js,再匹配xxx.vue
    // 如果都找不到,那么说明是个文件夹,找文件夹中的index.js
    extensions: ['.js', '.vue', '.json', ' '],
    alias: {
      // $表示准确的匹配,比如import vue from 'vue',优化查找速度
      // https://cn.vuejs.org/v2/guide/installation.html#
      // esm是使用ES6 Module语法开发的意思,使用webpack开发环境用vue.esm.js,正式环境用vue.runtime.esm.js
      'vue$': 'vue/dist/vue.esm.js',
      // 路径的变量,import xxx from '@/xxx'解析为import xxx from '解析出来的路径/xxx';
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // 处理css的预编译等
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ],
      },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

