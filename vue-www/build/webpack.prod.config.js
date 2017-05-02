
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

// 引入基本配置
var config = require('./webpack.config');

config.vue = {
	loaders : {
		css : ExtractTextPlugin.extract('css');
	}
};

config.plugins = [
	new ExtractTextPlugin('../')
]
