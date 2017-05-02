// 引入必要的模块
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
//var devMiddleware = require('webpack-dev-middleware');

// 创建一个express实例
var app = express();

// 调用webpack并把配置传递过去
var compiler = webpack(config);

// 使用webpack-dev-middleware中间件
var devMiddleware = require('webpack-dev-middleware')(compiler,{
	publicPath : config.output.publicPath,
	stats : {
		colors : true,
		chunks : false
	}
});

// 使用webpack-hot-middleware中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler);

// webpack插件,监听html文件的改变事件
compiler.plugin('compilation',function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit',function(data,callback){
		// 发布事件
		hotMiddleware.publish({ action : 'reload' });
		callback();
	})
});

// 注册中间件
app.use(devMiddleware);

// 注册中间件
app.use(hotMiddleware);

app.listen(8888,function(err){
	if(err){
		console.log(err);
		return
	}
	console.log('Listenning at http://localhost:8888');
});
