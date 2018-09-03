//process.env.NODE_ENV = 'production';

var webpack = require('webpack');
var consola = require('consola');
var webpackConfig = require('./webpack.config');


consola.warn('正在执行build任务');

consola.warn('webpackConfig',webpackConfig)

webpack(webpackConfig, function (err) {
    consola.warn(err);
});

