var path = require('path');

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        // 生产异步的js文件的时候要通过webpack.optimize.CommonsChunkPlugin给chunkName
        // 否则都是按自然数给name
        chunkFilename: '[name].chunk.js'
    },
}