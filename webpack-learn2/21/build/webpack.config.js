var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var purifyCss = require('purifycss-webpack');
var glob = require('glob-all');
var imageminPlugin = require('imagemin-webpack-plugin').default;
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var consola = require('consola');
var ora = require('ora');
var fs = require('fs');
var index = require('../config');
var utils = require('./utils');
// 如果require下没找到js文件(默认js后缀),那么开始找文件夹下的index.js文件
consola.warn('index.name',index.name);

consola.info( path.posix.join(path.resolve(__dirname, '../dist'), 'js/async.js') )

// console.log('ddddddddddddd',path.join(__dirname, '../node_modules'))
// console.log('ddddddddddddd',resolve('node_modules'))

consola.warn('process.env.NODE_ENV',process.env.NODE_ENV);

// 果然ora不支持gitbase,支持cmd
var spinner = ora({
    color: 'green',
    text: '正为生产环境打包，耐心点，不然自动关机。。。'
})
spinner.start();

setTimeout(function(){
    //spinner会有动的效果,stop可以停止
    spinner.stop()
},5000)

// 用于跳出build这个文件夹
function resolve (dir) {
    // 出现..的情况只能用join
    return path.join(__dirname, '..', dir)
  }

var env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : require('../config/prod.env')

    console.log('env',env)

module.exports = {
    // context用于设置根目录,
    // 影响到entry和loader使用相对路径时要以根目录为参考,
    context: path.resolve(__dirname, '../'),
    entry: {
        app: resolve('src/app.js'),
    },
    output: {
        path: resolve('dist'),
        // 动态(异步)和静态的文件,比如css的的图片src都会加上这个前缀
        // 影响到一切资源的前缀,html-webpack-plugin还有css最终打包后的前缀
        // 默认是'/',
        // 如果是dev环境,使用webpack-dev-server配合contentBase应该设置成'/'
        // 不然Cannot GET,或者可以在webpack-dev-server设置publicPath冲掉这个
        publicPath: '/',
        filename: utils.assetsPath('js/[name].[hash:5].js'),
        // chunkFilename是未被列在entry中,却又需要被打包出来的文件的命名配置
        // 如使用CommonJs的方式异步加载模块时会出现,
        // 并且生成的js文件不需要script引入,别的js文件会加载这个js文件
        chunkFilename: utils.assetsPath('js/[name].[hash:5].js'),
    },
    // eval调试console.log的时候出来的是webpack打包后位置的,
    // 而source-map调试console.log的时候除了的是源代码
    // 文档:https://doc.webpack-china.org/configuration/devtool/
    // 开发环境推荐cheap-module-source-map
    devtool: 'source-map',
    // 自带监听文件改变刷新浏览器效果,但是不是hot模块热替换
    devServer: {
        // 文件改变不会刷新浏览器,而是执行模块热更新
        // 一般不选true,因为选了true说明整个项目都做了热更新处理,不然会有一堆信息出来
        //hotOnly: true,
        // 热更新需要loader
        hot: true,
        contentBase: path.resolve(__dirname,'../dist/'),
        port: 8899,
        // 是否自动打开浏览器,和命令行中使用--open是一样的
        open: true,
        historyApiFallback: false,
        // 使用webpack-dev-server时的资源前缀,可以把output的publicPath冲掉
        publicPath: '/',
        proxy: {
            // /api/xxx会被代理成https://m.weibo.cn/api/xxx
            '/api': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug'
            },
            // 设置header
            // header: {
            //     // 登录
            //     'Cookie':
            // }
        },
        //
        quiet: true,
        // 默认开启watch模式,poll毫秒轮询一次文件的变化
        watchOptions: {
            poll: 1000,
        },
        // 浏览器上也可以看到gitbash的错误
        overlay: {
            warnings: false,
            errors: true
        }
    },

    resolve: {
        // 别名
        alias: {
            'Lib': resolve('src/lib'),
            'Less': resolve('src/less'),
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [resolve('node_modules')],
                include: [resolve('src')],
                use: [
                    {
                        // loader是从下到上执行,也可以加上enforce
                        //enforce: "pre",
                        //enforce: "post",
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            // formattter:格式化程序
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: extractTextWebpackPlugin.extract({
                    // fallback放style-loader,vue-style-loader等
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            // 开启sourMap时要去掉singleton,否则无效
                            // 并且不能使用extractTextWebpackPlugin
                            // css的sourceMap的使用代价有点大,不用了
                            sourceMap: true,
                            //singleton: true
                        },
                    },
                    // use填如果不使用extractTextWebpackPlugin的loaders数组
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            // postcss-loader要写在less-loader和css-loader之间
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                ident: 'postcss',
                                plugins: [
                                    // postcss-cssnext自带了autoprefixer
                                    //require('autoprefixer')(),
                                    // require('postcss-sprites')({
                                    //     spritePath: 'dist/assets/imgs/sprites'
                                    // }),
                                    //require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                use: [
                    // file-loader有copy,rename的功能
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         //regExp: /d+\.(png|jpg|jpeg|gif)$/,
                    //         name: '[name].bundle.[ext]',
                    //         // 以output.path为基准,负责生产文件的位置
                    //         outputPath: './',
                    //         // 加上这个参数,图片如果外部如果有文件夹,文件夹一样会输出
                    //         useRelativePath: true,
                    //         // 负责前缀
                    //         publicPath: 'assets/imgs/',
                    //     }
                    //},
                    {
                        // url-loader把图片转成base64编码
                        // url-loader封装了file-loader
                        // https://www.npmjs.com/package/file-loader
                        loader: 'url-loader',
                        options: {
                            //noquotes: true,
                            //fallback: "file-loader",
                            // 单位b,小于100k则转化成base64,否则和file-loader用法一样
                            limit: 1 * 1024,
                            name: '[name].bundle.[ext]',
                            //outputPath: './',
                            // 保留图片文件的上级目录一起输出
                            useRelativePath: true,
                            // 如果这项不填,那么沿用webpack的pubicPath
                            // 如果填了,css图片的src变成publicPath+'图片名',太不科学了
                            // 这样所有通过url-loader处理的css文件的图片都放到一个目录中
                            // 使用http地址的图片没问题
                            // 虽然可以用函数来控制
                            // 最好src中css和图片的位置关系和dist中css和图片的位置关系一致
                            publicPath: '../../assets/imgs/',
                            // publicPath: function(imgName){
                            //     consola.info('img',imgName)
                            //     return '../assets/imgs/'
                            // }
                        }
                    },
                    {
                        // image-webpack-loader对一些图片处理不行,会报错
                        // image-webpack不能做到无损压缩
                        // 还是gulp压缩图片好用
                        loader: 'image-webpack-loader',
                        options: {
                            // 只能设置jpeg
                            mozjpeg: {
                                progressive: true,
                                quality: 60,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            // jpg,png
                            webp: {
                                // 有损压缩
                                quality: 80,
                            }
                        }
                    },
                ]
            },
        ]
    },
    plugins: [

        // 热更新开启
        new webpack.HotModuleReplacementPlugin(),

        // 定义全局变量的插件
        // 可以把node环境的变量弄到客户端环境中
        new webpack.DefinePlugin({
            'process.env': env,
        }),

        // 如果要使用cssSourMap,这个插件不能用
        new extractTextWebpackPlugin({
            filename: utils.assetsPath('css/[name].min.css'),
            // 默认为false,如果为true,异步的css也打包到style-loader插入的css文件中
            allChunks: true,
        }),

        // 提纯css(用到的class)
        new purifyCss({
            // https://www.npmjs.com/package/glob-all
            // glob-all可以使用*返回匹配上的路径,返回值是一个数组
            paths: glob.sync([
                // path.join是简单的把两个路径拼接,
                // path.resolve相当于cd命令把所有的参数都执行,然后得出最后所在的位置
                // 所以出现..的情况只能用join
                path.join(__dirname,'../*.html'),
                path.join(__dirname,'../src/*.js')
            ])
        }),

        new webpack.HashedModuleIdsPlugin(),
        // https://www.jianshu.com/p/4dcccf390cb3
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                consola.warn('vendor',module.resource)
                // any required modules inside node_modules are extracted to vendor
                // 把node_modules的依赖包抽离出来放到vendor中
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
          }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),

        // 配置N个htmlWebpackPlugin会生成N个html
        new htmlWebpackPlugin({
            // filename是相对于output.path路径的
            filename: 'index.html',
            // template是相对当前目录
            template: resolve('index.html'),
            inject: true,
            // minify: {
            //     collapseWhitespace: true,
            // }
        }),
        // 每次打包时需要清除的目录
        //new cleanWebpackPlugin(['dist']),

    ]
}
