var webpack = require('webpack');
var consola = require('consola');
var path = require('path');
var webpackConfig = require('./webpack.config');
var rm = require('rimraf');
var rmPromise = require('rimraf-promise');
var chalk = require('chalk');

// rm删除文件是异步的,封装了一个回调函数
rm(path.join(__dirname, 'rm'),function (err){
    if (err){
        throw err
    }
    webpack(webpackConfig, function (err, stats){
        // process.stdout.write相当于console.log
        process.stdout.write(stats.toString({
            colors: true,
            // 不打印处理了哪些模块
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
        ))

    });



});

rmPromise(path.join(__dirname, 'rm')).then(function(){
    // 成功的回调
    process.stdout.write('then执行')
},function(err){
    // 失败的回调
})



// consola.start('start');
// consola.warn('warn');
// consola.success('success');
// consola.info('info');
// consola.debug('debug');
// consola.error('error');

consola.info('使用webpack()函数时,控制台不会出现wepback的打包信息,但是会打包成功')
consola.info('因为直接使用webpack其实是默认带参数的')
//process.stdout.write('\x07')