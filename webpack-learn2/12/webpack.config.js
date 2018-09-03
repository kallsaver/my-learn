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
                    {
                        loader: 'style-loader',
                        options: {
                            // style插入#app中,
                            //insertInto: '#app',
                            // 合并成一个style
                            singleton: true,
                            // 要在这个路径下新建一个CommonJs规范的js文件
                            // 作用是可以判断浏览器的类型,然后做些处理,用处不大
                            // transform: './css.transform.js',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            // css module
                            modules: true,
                            localIdentName: '[path][name]-[local]-[hash:base64:5]'
                        }
                    },
                ]
            }
        ]
    }
}