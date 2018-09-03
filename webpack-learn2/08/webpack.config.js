var webpack = require('webpack');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        // chunkName : 路径
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'pageC': './src/pageC',
        // 这里的vendor不是关键字,只要是数组形式就表明是第三方库写在这里,
        'vendor': ['lodash'],
        // 这样也可以表明是第三方库,因为是从node_modules中拿取
        //'vendor': 'lodash',
        //'vendor': ['lodash'],
        //'vendors': ['jquery'],
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        // 这里的name其实就是chunkName
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: [

        // webpack可视化打包分析
        new BundleAnalyzerPlugin(),

        // CommonsChunkPlugin是webpack自带的插件
        // 作用是将多入口(chunks)打包的文件将公共的代码提取出来
        new webpack.optimize.CommonsChunkPlugin({
            // 第一个Infinity的name如果没和入口的chunk名字对应上
            // 会发现提取公共业务代码也会重复把库的代码提取
            name: 'vendor',
            // 如果写成Infinity,是提取引入第三方库,并且不会再提取公共的业务代码
            // 只会提取chunk格式为数组的部分
            // 并且第一个Infinity的不会产出新的文件
            minChunks: Infinity,
            // 如果被忽略,所有的入口chunk(entry chunk)都会被选择。
            // 选择需要提取公共代码的入口chunk
            // 如果只选择pageA,pageB,会发现pageB.bundle.js有moduleA的代码
            //chunks: ['pageA','pageB']
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            // 如果这里的位置是第一位,要必填chunks,否则报错:
            // While running in normal mode it's not allowed to use a non-entry chunk
            // 这个报错通常也和位置有关
            // 最好带上chunks,可以使得结构清晰
            chunks: ['pageA','pageB','pageC']
        }),
    ]
}