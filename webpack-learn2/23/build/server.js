var express = require('express');
var webpack = require('webpack');
var opn = require('opn');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var porxyMiddleware = require('http-proxy-middleware');
var historyApiFallback = require('connect-history-api-fallback');

var app = express();
var port = 3000;

var config = require('./webpack.common.config')('development');
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

app.use(webpackHotMiddleware(compiler));

app.listen(port, function () {
    console.log('success listen to ' + port);
    opn('http://localhost:' + port);
});