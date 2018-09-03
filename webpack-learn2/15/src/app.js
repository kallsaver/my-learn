
import base from './less/base.less';


import { a } from './common/util'; 
console.log(a());

// lodash使用export来导出的
// 第三方库的写法有些不是按webpack的规范来写,所以webpack.optimize.UglifyJsPlugin用不了
// 用babel的插件babel-plugin-lodash
//import { chunk } from 'lodash';
//console.log(chunk([1,2,3],2));

// 不能用import * as _ from 'lodash',不然会
import _ from 'lodash';
console.log(_.chunk([1,2,3],2));

// import(/* webpackChunkName: 'async' */ './common/async.js').then(function(async){
//     console.log(async)
// });

require.ensure(['./common/async.js'],function(){
    var async = require('./common/async.js');
    console.log(async);
},'async');

