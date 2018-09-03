var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var consola = require('consola');
var chalk = require('chalk');
var net = require('net');
var treeify = require('treeify');

process.env.NODE_ENV = 'production from node not from DefinePlugin';


var obj = {
    name: "'obj'"
}

var realObj = {
    name: 'realObj',
    one: [1],
    ones: ['1'],
    arr: [1, 2, 3],
    is: true,
    a: {
        name: "a"
    },
    list: [
        {
            name: "d",
            cityList:[
                {
                    city: "beijing",
                    countyList: ["ddd","aaa","bbb"]
                },
                {
                    city: "hangzhou",
                    countyList: ["fff","ggg","ooo", {last: 'ddd'}]
                },
            ]
        }
    ],
    fn: function(){
        return 1
    },
    checkClass: checkClass
}

// https://github.com/notatestuser/treeify
console.log(
    treeify.asTree(realObj,true,false)
)

function checkClass(o){
    return Object.prototype.toString.call(o).slice(8,-1)
}

// 获得一个函数的参数的名字
function getArgs(func) {
    // 先用正则匹配,取得符合参数模式的字符串.
    // 第一个分组是这个: ([^)]*) 非右括号的任意字符
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]
    // 用逗号来分隔参数(arguments string).
    return args.split(",").map(function(arg) {
        // 去除注释(inline comments)以及空格
        return arg.replace(/\/\*.*\*\//, "").trim();
    }).filter(function(arg) {
        // 确保没有 undefined.
        return arg
    })
}

function parseDefinePlugin (obj) {
    var result;

    if(checkClass(obj) === 'Array'){
        result = [];
    }else if(checkClass(obj) === 'Object'){
        result = {};
    }else{
        return obj;
    }
    
    for(var key in obj){
        var copy = obj[key];
        if(checkClass(copy) === 'Array'){
            copy.Length = copy.length;
            result[key] = parseDefinePlugin(copy);
        } else if(checkClass(copy) === 'Object'){
            result[key] = parseDefinePlugin(copy);
        }else if(checkClass(copy) === 'Function'){
            var str = copy.toString();
            // 提取函数体 
            // node环境用/s不能代表空格换成万能的.*
            var body = str.replace(/^function.*?\(.*?\).*?\{(.*)/g,'$1').slice(0, -1);
            // 如果是没有参数的函数
            if( copy.length === 0 ){
                // 黑科技es6字符串模板
                result[key] = 'new Function('+ '`' + body + '`' +')';
            }else{
                var argList = getArgs(copy);
                var str = '';
                for(var i = 0; i < argList.length; i++){
                    console.log(argList[i]);
                    str += '`' + argList[i] + '`' + ',';
                }
                result[key] = 'new Function('+ str + '`' + body + '`' +')';
            }
        }else{
            result[key] = JSON.stringify(copy);
        }
    }
    return result;
}


module.exports = {
    entry: {
        // chunkName : 路径
        main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        publicPath: './',
        filename: '[name].[chunkhash:5].bundle.js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    resolve: {
        // import后缀省略
        extensions: ['.js'],
        alias: {
            Src: path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                include: [path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader'
                },
            }
        ]
    },
    plugins: [

        new webpack.DefinePlugin({
            //"process.env": "'prodution'",
            "A": "[4]",
            "A1": [4],
            "A2": "new Array('1')",
            "B": "{name:'B'}",
            "B1": {name:"'B'"},
            "C": "true",
            "D": "1",
            "E": "'1'",
            "F.env": obj,
            "G": JSON.stringify(obj),
            // 把node.js的process.env对象注入到客户端
            "H": (function(){
                consola.info('process',process.env)
                return JSON.stringify(process.env)
            })(),
            "F": (function(){
                consola.info('__filename',__filename)
                return JSON.stringify(__filename)
            })(),
            "realObj": parseDefinePlugin(realObj) 
        }),



        new webpack.HashedModuleIdsPlugin(),
        // https://www.jianshu.com/p/4dcccf390cb3
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                //console.log(module.resource)
                //consola.warn('vendor',module.resource)
                // any required modules inside node_modules are extracted to vendor
                // 把node_modules的依赖包抽离出来放到vendor中
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
          }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),

        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            //hash: true,
            chunksSortMode: 'dependency',
        }),
    ],
    // key必须是node的全局变量,value是 false | true | "mock"
    // webpack3.10.0中value是'empty'(空对象)被废弃
    // true是其它环境(浏览器)可以使用node里面的全部变量
    // false是不可以注入,'mock'是功能是阉割版的
    // 默认值:
    // node: {
    //     console: false,
    //     global: true,
    //     process: true,
    //     __filename: "mock",
    //     __dirname: "mock",
    //     Buffer: true,
    //     setImmediate: true
    //     // 更多选项，请查看“其他 Node.js 核心库”
    // },
    node: {
        global: true,
        __filename: true,
        // 设置了path: false,在客户端使用require('path')是没作用的
        path: true,  
        // 客户端只能拿到的是没有任何赋值的process模块
        // 赋值的只能通过webpack.DefinePlugin去传值
        process: true
    }
}