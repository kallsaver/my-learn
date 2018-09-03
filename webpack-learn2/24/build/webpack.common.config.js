var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var purifyCss = require('purifycss-webpack');
var glob = require('glob-all');
var imageminPlugin = require('imagemin-webpack-plugin').default;
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');

var productionConfig = require('./webpack.prod.config');
var developmentConfig = require('./webpack.dev.config');

// 封装一个绝对路径的方法跳出build文件夹
function resolve (dir) {
    // path.join相当于在当前目录cd.. 然后cd dir这样
    return path.join(__dirname, '..', dir)
}

var generateConfig = function(env){
    return {
        context: path.resolve(__dirname, '../'),
        entry: {
            app: path.resolve(__dirname,'../src/app.js'),
            vendor: ['jquery','babel-polyfill']
        },
        output: {
            path: path.resolve(__dirname,'../dist'),
            // 动态(异步)和静态的文件,比如css的的图片src都会加上这个前缀
            // 使用了htmlWebpackPlugin就不需要这个参数了
            //publicPath: 'dist/',
            filename: '[name].bundle.js', //+ env + '.js',
            // chunkFilename是未被列在entry中,却又需要被打包出来的文件的命名配置
            // 如使用CommonJs的方式异步加载模块时会出现,
            // 并且生成的js文件不需要script引入,别的js文件会加载这个js文件
            chunkFilename: '[name].chunk.js',
        },
        // eval调试console.log的时候出来的是webpack打包后位置的,
        // 而source-map调试console.log的时候除了的是源代码
        // 文档:https://doc.webpack-china.org/configuration/devtool/
        // 开发环境推荐cheap-module-source-map
        devtool: 'eval-source-map',
        // 自带监听文件改变刷新浏览器效果,但是不是hot模块热替换
        devServer: {
            // 文件改变不会刷新浏览器,而是执行模块热更新
            // vue-loader自带了vue组件热更新的特性
            //hotOnly: true,
            hot: true,
            contentBase: path.resolve(__dirname,'../dist/'),
            port: 8888,
            historyApiFallback: false,
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
            }
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            // 别名
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'Lib': path.resolve(__dirname,'../src/lib'),
                'Less': path.resolve(__dirname,'../src/less')
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
                            loader: 'babel-loader'
                        },
                    ]
                },
                // vue-loader本身就支持编译less,sass等变成style标签
                {
                    test: /\.vue$/,
                    include: [resolve('src')],
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: extractTextWebpackPlugin.extract({
                                fallback: {
                                    loader: 'vue-style-loader',
                                },
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            sourceMap: true,
                                        }
                                    },
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            sourceMap: true,
                                        }
                                    },
                                ]
                            }),
                            less: extractTextWebpackPlugin.extract({
                                // vue-style-loader包含了style-loader的功能
                                fallback: 'vue-style-loader',
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            sourceMap: true,
                                        }
                                    },
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            sourceMap: true,
                                        }
                                    },
                                    {
                                        loader: 'less-loader',
                                        options: {
                                            sourceMap: true,
                                        }
                                    },
                                ],
                            }),
                        }
                    }
                },
                {
                    test: /\.less$/,
                    include: [resolve('src')],
                    use: extractTextWebpackPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                        ],
                    }),
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    use: [
                        {
                            // url-loader把图片转成base64编码
                            // url-loader封装了file-loader
                            loader: 'url-loader',
                            options: {
                                //noquotes: true,
                                //fallback: "file-loader",
                                // 单位b,小于100k则转化成base64,否则和file-loader用法一样
                                limit: 1 * 1024,
                                name: '[name].bundle.[ext]',
                                outputPath: './',
                                useRelativePath: true,
                                publicPath: 'assets/imgs/',
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
            
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
                //chunks: ['app','vendor']
            }),
    
            // 如果想保持第三方库的纯净,不和webpack自动生成的代码混在一起,webpackJsonP
            // 还有一个分离的好处是如果业务代码改变的话,manifest代码也是会改变的
            // 但是vendor的代码是不会改变的
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                // 第二个Infinity是提取webpackJsonP这样的东西,会产出新文件
                minChunks: Infinity,
            }),

            // 可以把所有的css代码都输出到一个css文件中
            new extractTextWebpackPlugin({
                filename: '[name].min.css',
                // 默认为false,如果为true,异步的css也打包到style-loader插入的css文件中
                allChunks: true,
            }),
    
            // 提纯css(用到的class),对.vue文件的识别没作用
            // new purifyCss({
            //     // https://www.npmjs.com/package/glob-all
            //     // glob-all可以在js的路径中使用*匹配符合规则的路径
            //     paths: glob.sync([
            //         // path.join是简单的把两个路径拼接,
            //         // path.resolve相当于cd命令把所有的参数都执行,然后得出最后所在的位置
            //         path.join(__dirname,'../*.html'),
            //         path.join(__dirname,'../src/*.js'),
            //         path.join(__dirname,'../src/**/*.vue')
            //     ])
            // }),

            // 配置N个htmlWebpackPlugin会生成N个html
            new htmlWebpackPlugin({
                // filename是相对于output.path路径的
                filename: 'index.html',
                // template是相对当前目录
                template: path.resolve(__dirname, '../index.html') ,
                inject: true,
                hash: true,
                // 和app这个入口chunk有关的才处理
                //chunks: ['app'],
                // minify: {
                //     collapseWhitespace: true,
                // }
            }),
            // 每次打包时需要清除的目录
            //new cleanWebpackPlugin(['dist']),
    
        ],
    }
}

module.exports = function (env){
    // 通过--env production传入参数
    // 如果是development,合并webpack.dev.config.js和这个文件的配置,开发用webpack-dev-server
    var config = env === 'production'
    ? productionConfig
    : developmentConfig
    return merge( generateConfig(env), config);
}
