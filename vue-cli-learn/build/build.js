

process.env.NODE_ENV = 'production'

const webpackConfig = require('./webpack.prod.conf')
const webpack = require('webpack')


webpack(webpackConfig ,function (err, stats) {

})
