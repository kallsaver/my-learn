import base from './src/less/base.less';

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);

require.ensure(['./src/js/async.js'],function(){
    var async = require('./src/js/async.js');
    console.log('async',async);
},'async');