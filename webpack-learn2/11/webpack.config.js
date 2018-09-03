var webpack = require('webpack');
var path = require('path');

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
        filename: '[name].bundle.js'
    },
    plugins: [

        
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 越在后面的越先处理
                    // loader类似gulp的pipe文件流处理
                    {
                        loader: 'style-loader',
                    },
                    {
                        // 使用css-loader生成的是style标签加载到html
                        // 多少个import就有多少个style
                        loader: 'css-loader'
                    },
                    // {
                    //     // style-loader有/url的选项
                    //     loader: 'style-loader/url'
                    // },
                    // {
                    //     // 使用file-loader会生成的是css文件,用link的方式加载到html
                    //     // 不好的地方是有多少个import就有多少个css文件
                    //     loader: 'file-loader'
                    // },
                ]
            }
        ]
    }
}