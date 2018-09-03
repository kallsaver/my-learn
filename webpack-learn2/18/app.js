// Less在webpack.config.js的resolve做了别名处理
import base from 'Less/base.less';
// import $ from './src/lib/jquery';
console.log('$',$);

// import * as $1 from './src/lib/jquery';
// console.log('$1',$1);

// import _ from 'Lib/jquery-module';
// console.log('_',_);

// import * as _1 from './src/lib/jquery-module';
// console.log('_1',_1);

//console.log( _ === _1 );  // true

// CommondJs规范
// var test = require('./src/lib/test');
// console.log('test',test);

// var Better1 = require('./src/lib/vue-module');
// console.log('Better1',Better1);

// import Better2 from './src/lib/vue-module';
// console.log('Better2',Better2);


var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);

require.ensure(['./src/js/async.js'],function(){
    var async = require('./src/js/async.js');
    console.log('async',async);
},'async');