var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

// 引入webpack.config.js的配置,然后不同的配置在webpack.dev.config.js后面覆盖掉
var config = require('./webpack.config');

config.output.publicPath = '/';

config.plugins = [
	
	// 添加三个插件
	new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

	new HtmlWebpackPlugin({
		filename : 'app/index/index.html',
		template : path.resolve(__dirname,'../app/index/index.html'),
		inject : true
	})
];

// 动态向入口配置中注入webpack-hot-middleware/client;
//var devClient = 'webpack-hot-middleware/client';
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function(item,index){
	var extras = [devClient];
	// 向config.entry中添加
	config.entry[item] = extras.concat(config.entry[item]);
	// 结果:
//	entry: {
//		index : ['./build/dev-client', path.resolve(__dirname, '../app/index/index.js')],
//	}
})

module.exports = config;
