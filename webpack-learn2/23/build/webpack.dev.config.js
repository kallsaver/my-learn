var path = require('path');
var webpack = require('webpack');

module.exports = {
    // 自带监听文件改变刷新浏览器效果,但是不是hot模块热替换
    devServer: {
        // 文件改变不会刷新浏览器,而是执行模块热更新
        //hotOnly: true,
        //hot: true,
        contentBase: path.resolve(__dirname,'../dist/'),
        port: 9001,
        open: true,
        historyApiFallback: false,
        proxy: {
            // /api/xxx会被代理成https://m.weibo.cn/api/xxx
            '/api': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug'
            },
            // 设置header
            // header: {
            //     // 登录
            //     'Cookie': 
            // }
        }
    },
}