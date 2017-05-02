// node.js的path模块  Command规范
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口文件,node.js的path模块的resolve方法,可以结合我们给定的两个参数最后生成绝对路径,
	// 最终指向的就是我们的index.js文件
	// entry可以多个入口
    entry : {
    	index : path.resolve(__dirname,'../app/index/index.js')
    },
    output : {
    	// 输出路径是
    	path : path.resolve(__dirname,'../output/static'),
    	// 根目录
    	publicPath : 'static/',
    	// 文件名
    	//filename : '[name].[hash].js',
    	// 会把filename冲掉
    	//chunkFilename : '[id].[chunkhash].js'
    	filename : '[name].bundle.js'
    },
    resolve : {
    	// require或者es6的import...from时省略的扩展名,如 :import Favlist from './components/favlist'
    	// 先在components查找favlist,然后查找favlist.js,如果都没有,查找favlist.vue
    	extensions : ['','.js','.vue']
    	// 别名
    },
    module : {
    	loaders : [
    		{
    			test : /\.vue$/,
    			loader : 'vue'
    		},
    		{
    			test : /\.js$/,
    			loader : 'babel?presets=es2015',
    			exclude : /node_modules/
    		},
    		{
    			test : /\.less$/,
    			loader : 'style!css!less',
    			exclude : /node_modules/
    		}
    	]
    },
    // plugins是在源文件经过webpack的loaders编译打包完成后进行,处理编译后的文件
    // 所以作用的目录是在output的publicPath节点定义的目录
    plugins : [
    	new HtmlWebpackPlugin({
    		// filename会输出一个html文件
    		// output的path节点定义的目录为根目录,或者使用原来的index.html,并且使用绝对路径
    		filename : '../index.html',
    		template : path.resolve(__dirname,'../app/index/index.html'),
    		// 是否把生成的js文件注入到生成的html中,默认是true
    		inject : true
    	}),
    ]
}