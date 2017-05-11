// node.js内置的package
var path = require('path');
var webpack = require('webpack');

module.exports = {
	// 入口文件
	entry : './src/main.js',
	output : {
		// 打包后的js文件输出的目录
		path : path.join(__dirname,'./dist'),
		// 输出文件的根目录
		pubulicPath : 'dist/',
		filename : 'build.js'
	},
	resolve : {
		// require时省略的扩展名,如:require('module')不需要module.js
		extensions : ['', '.js', '.vue'],
		// 别名
		alias : {
			// path.join的意义是正确使用linux和window的分隔符
			components : path.join(__dirname, './src/components')
		}
	},
	resolveLoader : {
		root : path.join(__dirname,'node_modules')
	},
	module : {
		loaders : [
			{
				test : /\.vue$/,
				loader : 'vue'
			},
			{
				test : /\.js$/,
				loader : 'babel',
				exclude : /node_modules/
			},
			{
				test : /\.css$/,
				loader : 'vue-style-loader!css-loader'
			},
			{
				test : /\.less$/,
				loader : 'vue-style-loader!css-loader!less-loader'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file',
				query : {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	// webpack-dev-server配置
	devServer : {
		// 好像配不配都没啥影响
		historyApiFallback : true,  // 不跳转
		colors : true,
		inline : true    // 实时刷新
	},
	// 开启source-map,webpack有多种source-map
	devtool : '#eval-source-map'
}

// 生成环境,运行npm run build执行这里
if(process.env.NODE_ENV === 'production'){
	module.exports.detool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		// 通过配置DefinePlugin,那么里面的标识就相当于全局变量,业务代码就可以直接使用
		new webpack.DefinePlugin({
			'process.env' : {
				NODE_ENV: '"production"'
			}
		}),
		// 压缩代码
		new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
	])
}
