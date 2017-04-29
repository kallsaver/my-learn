module.exports = {
    // 入口文件 这个文件通过import from的语法拿到其他的js的module default和css文件
    entry : './entry.js',
    output : {
        // __dirname表示输出目录和entry.js在同一个目录下
        path : __dirname,
        filename : 'bundle.js'
    },
    // 使用webpack时就会运行webpack --devtool source-map
    // 用来在浏览器查看源代码
    devtool : 'source-map',
    // 要使用的插件模块
    module : {
        loaders : [
            //表示所有符合.js后缀结束的文件才会被babel-loader等处理
			//  \.是正则的转义字符
			//exclude排除不想被处理的.js文件
            {test : /\.js$/, exclude :/node_modules/ , loader :'babel-loader'},
			{test : /\.css$/, loader : 'style-loader!css-loader'}    
        ]
    }
}