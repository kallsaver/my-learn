var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        // chunkName : 路径
        'pageA': './src/pageA',
        //'pageB': './src/pageB',
        //'pageC': './src/pageC',
        'vendor': ['lodash','jquery'],
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
    resolve: {
        alias: {
            Src: path.resolve(__dirname, 'src')
        }
    },
    plugins: [

        // CommonsChunkPlugin是webpack自带的插件
        // 作用是将多入口(chunks)打包的文件将公共的代码提取出来
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),

        // 如果想保持第三方库的纯净,不和webpack自动生成的代码混在一起,webpackJsonP
        // 还有一个分离的好处是如果业务代码改变的话,manifest代码也是会改变的
        // 但是vendor的代码是不会改变的
        new webpack.optimize.CommonsChunkPlugin({
            // 如果是能有效的生产代码文件,name作为filename输出文件名
            name: 'manifest',
            // 第二个Infinity是提取webpackJsonP这样的东西,会产出新文件
            minChunks: Infinity,
        }),

        // 上面两个webpack.optimize.CommonsChunkPlugin由于参数相同,可以合并成一个
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor','manifest'],
        //     minChunks: Infinity,
        // }),

        // 用于提取业务中重复的代码
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2,
        //     // 如果这里的位置是第一位,要必填chunks,否则报错:
        //     // While running in normal mode it's not allowed to use a non-entry chunk
        //     // 这个报错通常也和位置有关
        //     // 最好带上chunks,可以使得结构清晰
        //     chunks: ['pageA','pageB','pageC']
        // }),
    ]
}