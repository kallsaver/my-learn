

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

// 引入基本配置
var config = require('./webpack.config');

config.vue = {
	loaders : {
		// 这个命令会从.vue中提取less文件
		less: ExtractTextPlugin.extract('css!less')
	}
};

config.plugins = [
	// 提取less为单文件
	new ExtractTextPlugin('../[name].less'),
	new HtmlWebpackPlugin({
		filename : '../index.html',
		template : path.resolve(__dirname,'../app/index/index.html'),
		inject : true
	})
];

module.exports = config;




