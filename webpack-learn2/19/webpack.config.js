var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var purifyCss = require('purifycss-webpack');
var glob = require('glob-all');
var imageminPlugin = require('imagemin-webpack-plugin').default;
var consola = require('consola');

// ora也是只支持苹果电脑呢
var ora = require('ora');
var spinner = ora('Loading unicorns').start();
 
setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);

consola.warn('jquery的绝对路径是',require.resolve('jquery'));

var arr1 = glob.sync([
    './test/**/*.js'
]);

// glob.sync返回的是个数组
consola.warn(Object.prototype.toString.call(arr1).slice(8,-1));

consola.warn('写法1匹配的文件名',arr1);
consola.warn('写法1匹配的数量',arr1.length);

var arr2 = glob.sync([
    path.resolve(__dirname, 'test/**/*.js')
]);

consola.warn('写法2匹配的文件名',arr2);
consola.warn('写法2匹配的数量',arr2.length);

module.exports = {
    entry: {
        app: path.resolve(__dirname,'app.js'),
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        // 动态(异步)和静态的文件,比如css的的图片src都会加上这个前缀
        publicPath: 'dist/',
        filename: '[name].bundle.js',
        // chunkFilename是未被列在entry中,却又需要被打包出来的文件的命名配置
        // 如使用CommonJs的方式异步加载模块时会出现,
        // 并且生成的js文件不需要script引入,别的js文件会加载这个js文件
        chunkFilename: '[name].chunk.js',
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
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            // postcss-loader要写在less-loader和css-loader之间
                            loader: 'postcss-loader',
                            options: {
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
            {   
                // imports-loader相当于在文件的开头自动import
                // 还可以针对某个文件使用imports-loader处理引入第三方库
                //test: path.resolve(__dirname,'app.js'),
                test: /\.js$/,
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            // 类库,直接使用模块名或者使用模块的路径
                            //$: 'jquery',
                            // 类库,require.resolve可以解析出模块的绝对路径
                            $: require.resolve('jquery'),
                            // 路径
                            //$: path.resolve(__dirname, 'src/lib/jquery-module.js')
                        }
                    }
                ],
                // 不在inclue中的使用$将不会自动import,会报错
                include: [path.resolve(__dirname,'app.js'),path.resolve(__dirname,'src')]
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
                path.join(__dirname,'./*.html'),
                path.join(__dirname,'./src/*.js')
            ])
        }),
    ],
}