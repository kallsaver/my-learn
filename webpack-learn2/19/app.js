// Less在webpack.config.js的resolve做了别名处理
import base from 'Less/base.less';
import header from './src/js/components/header';
//import notsrc from './notsrc';
console.log('$',$);

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);

require.ensure(['./src/js/async.js'],function(){
    var async = require('./src/js/async.js');
    console.log('async',async);
},'async');