'use strict'
const path = require('path')
const consola = require('consola')
exports.assetsPath = function (_path) {
    const assetsSubDirectory = 'static';
    consola.info('-----------------------------------------')
    // static/js/[name].[chunkhash:5].js
    consola.info( path.posix.join(assetsSubDirectory, _path) )
    // static\js\[name].[chunkhash:5].js
    consola.info( path.join(assetsSubDirectory, _path) )
    return path.join(assetsSubDirectory, _path)
    return path.posix.join(assetsSubDirectory, _path)
}