var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        // chunkName : 路径
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        //'pageC': './src/pageC',
        'vendor': ['lodash'],
    },
    output: {
        // path是webpack所有文件的输出路径,必须是绝对路径,output输出的js,
        // url-loader解析的图片,HtmlWebpackPlugin生产的html文件,
        // 都会存放在以path为基础的目录下
        path: path.resolve(__dirname,'./dist'),
        // publicPath并不会对生产文件的路径造成影响,
        // 主要是你的页面中引入的资源的路径的前缀补全,比如图片,异步的js
        publicPath: './dist/',
        // 这里的name其实就是chunkName
        // 是最终生产的文件名
        filename: '[name].bundle.js',
        // chunkFilename是未被列在entry中,却又需要被打包出来的文件的命名配置
        // 如使用CommonJs的方式异步加载模块时会出现,
        // 并且生成的js文件不需要script引入,别的js文件会加载这个js文件
        chunkFilename: '[name].chunk.js',

    },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','manifest'],
            minChunks: Infinity,
        }),

        new webpack.optimize.CommonsChunkPlugin({
            async: 'async-common',
            // 子模块也提取,设置了children就不能设置chunks了,
            // 应该是默认所有入口的
            children: true,
            minChunks: 2,
        })
    ]
}