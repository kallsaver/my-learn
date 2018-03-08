
module.exports = {
    // devtool是webpack在在浏览器Source中查看源文件的工具
    // 1.source-map : 在一个单独的文件中产生一个完整且功能完全的文件
    // 这个文件具有最后的source map,但是它会减慢打包速度
    // 2.cheap-module-source-map : 在一个单独的文件中生成一个不带列
    // 映射的map,不带列映射提高了打包速度,但是也使得浏览器开发者工
    // 具只能对应到具体的行,不能对应到具体的列（符号）,会对调试造成
    // 不便;
    // 3.eval-source-map : 使用eval打包源文件模块,在同一个文件中生
    // 成干净的完整的source map。这个选项可以在不影响构建速度的前提下
    // 生成完整的sourcemap,但是对打包后输出的JS文件的执行具有性能和安
    // 全的隐患。在开发阶段这是一个非常好的选项,在生产阶段则一定不要启
    // 用这个选项;
    // 4.cheap-module-eval-source-map : 这是在打包文件时最快的生成
    // source map的方法,生成的Source Map 会和打包后的JavaScript文件
    // 同行显示,没有列映射,和eval-source-map选项具有相似的缺点;
    // 从上往下越来越快,eval只应该在开发阶段使用
    devtool : 'cheap-module-eval-source-map',
    // __dirname是node.js中的一个全局变量,它指向当前执行脚本所在的目录
    entry : __dirname + '/app/main.js',
    output : {
        // path是打包后的文件存放的地方
        path : __dirname + '/public',
        // 打包后输出文件的文件名
        filename : 'bundle.js'
    },
    devServer : {
        // 本地服务器所加载的页面所在的目录
        contentBase : './public',
        // 不跳转
        historyApiFallback: true,
        // 实时刷新 
        inline: true
    },
    module : {
        rules : [
            {
                test : /(\.jsx|\.js)$/,
                loader : 'babel-loader',
                options : {
                    presets : [
                        'env','react'
                    ]
                },
                exclude : /node_modules/
            }
        ]
    }

}