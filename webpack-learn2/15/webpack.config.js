var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var lodashModuleReplacementPlugin = require('lodash-webpack-plugin');


module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
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
                            options: {
                                //minimize: true,
                                modules: true,
                                sourceMap: true,
                                //localIdentName: '[path][name]-[local]-[hash:base64:5]',
                                localIdentName: '[local]'
                            }
                        },
                        {
                            // postcss-loader要写在less-loader和css-loader之间
                            loader: 'postcss-loader',
                            options: {
                                //ident: 'postcss',
                                plugins: [
                                    // postcss-cssnext自带了autoprefixer
                                    //require('autoprefixer')(),
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                use: [
                    {
                        // babel的功能不仅仅是转es6
                        // 它可以做一切处理js的流程的插件
                        loader: 'babel-loader',
                        options: {
                            // babel-preset-env同样可以忽略前缀babel-preset,@babel不行
                            presets: ['@babel/preset-env'],
                            //plugins: ['babel-plugin-lodash'],
                            // 可忽略babel-plugin前缀
                            plugins: ['lodash']
                        }
                    }
                ]
            }
        ]
    },
    // 插件些这里,包括插件的配置
    plugins: [
        new extractTextWebpackPlugin({
            filename: '[name].min.css',
            // 默认为false,如果为true,异步的css也打包到style-loader插入的css文件中
            allChunks: false,
        }),
        new lodashModuleReplacementPlugin,
        new webpack.optimize.UglifyJsPlugin()
    ],
}