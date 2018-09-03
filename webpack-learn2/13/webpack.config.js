var webpack = require('webpack');
var path = require('path');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        // path是webpack所有文件的输出路径,必须是绝对路径,output输出的js,
        // url-loader解析的图片,HtmlWebpackPlugin生产的html文件,
        // 都会存放在以path为基础的目录下
        path: path.resolve(__dirname,'./dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractTextWebpackPlugin.extract({
                    fallback:{
                        loader: 'style-loader',
                        options: {
                            // style插入#app中,
                            //insertInto: '#app',
                            // 合并成一个style
                            singleton: true,
                        },
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
                            loader: 'less-loader'
                        }
                    ] 
                })
            },
        ]
    },
    // 插件些这里,包括插件的配置
    plugins: [
        new extractTextWebpackPlugin({
            filename: '[name].min.css',
            // 默认为false,如果为true,异步的css也打包到style-loader插入的css文件中
            allChunks: true,
        })
    ],
}