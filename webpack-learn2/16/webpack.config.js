var path = require('path');
var webpack = require('webpack');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var purifyCss = require('purifycss-webpack');
var glob = require('glob-all');

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
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
        ]
    },
    // 插件写这里,包括插件的配置
    plugins: [
        new extractTextWebpackPlugin({
            filename: '[name].min.css',
            // 默认为false,如果为true,异步的css也打包到style-loader插入的css文件中
            allChunks: true,
        }),
        new purifyCss({
            paths: glob.sync([
                // path.join是简单的把两个路径拼接,
                // path.resolve相当于cd命令把所有的参数都执行,然后得出最后所在的位置
                // 所以path.resolve不能和*同时使用
                path.join(__dirname,'./*.html'),
                path.join(__dirname,'./src/*.js')
            ])
        })
    ],
}