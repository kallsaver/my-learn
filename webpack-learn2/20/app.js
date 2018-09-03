// Less在webpack.config.js的resolve做了别名处理
import base from 'Less/base.less';
console.log('$',$);

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);

require.ensure(['Src/js/async.js'],function(){
    var async = require('./src/js/async.js');
    console.log('async',async);
},'async');

require(['./src/js/async2.js'],function(){
    console.log('async1',async);
});