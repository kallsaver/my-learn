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

var generateConfig = function(env){
    return {
        entry: {
            app: path.resolve(__dirname,'app.js'),
        },
        output: {
            path: path.resolve(__dirname,'dist'),
            // 动态(异步)和静态的文件,比如css的的图片src都会加上这个前缀
            // 使用了htmlWebpackPlugin就不需要这个参数了
            //publicPath: 'dist/',
            filename: '[name].bundle.' + env + '.js',
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
            //hotOnly: true,
            //hot: true,
            contentBase: path.resolve(__dirname,'dist/pages'),
            port: 9001,
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
            // 别名
            alias: {
                'Lib': path.resolve(__dirname,'src/lib'),
                'Less': path.resolve(__dirname,'src/less')
            }
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: extractTextWebpackPlugin.extract({
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
                // 还可以针对某个文件使用imports-loader处理引入第三方库
                {
                    test: path.resolve(__dirname,'app.js'),
                    use: [
                        {
                            loader: 'imports-loader',
                            options: {
                                $: 'jquery'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
    
            new extractTextWebpackPlugin({
                filename: '[name].min.css',
                // 默认为false,如果为true,异步的css也打包到style-loader插入的css文件中
                allChunks: true,
            }),
    
            // 提纯css(用到的class)
            new purifyCss({
                // https://www.npmjs.com/package/glob-all
                // glob-all可以在js的路径中使用*匹配符合规则的路径
                paths: glob.sync([
                    // path.join是简单的把两个路径拼接,
                    // path.resolve相当于cd命令把所有的参数都执行,然后得出最后所在的位置
                    // 所以path.resolve不能和*同时使用
                    path.join(__dirname,'./*.html'),
                    path.join(__dirname,'./src/*.js')
                ])
            }),
            // 配置N个htmlWebpackPlugin会生成N个html
            new htmlWebpackPlugin({
                // filename是相对于output.path路径的
                filename: 'pages/index.html',
                // template是相对当前目录
                template: './index.html',
                inject: true,
                hash: true,
                // 和app这个入口chunk有关的才处理
                chunks: ['app'],
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
    var config = env === 'production'
    ? productionConfig
    : developmentConfig
    return merge(generateConfig(env), config);
}
