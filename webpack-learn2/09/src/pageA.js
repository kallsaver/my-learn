//import "./subPageA";
//import "./subPageB";
import * as _ from 'lodash';
import * as $ from 'jquery';


// require.include用于提取预加载的js文件的公共代码
// 不会产生新文件,在pageA.bundle.js输出moduleA模块
// pageA.bundle.js不是预加载js文件,是同步的,
// 如果希望subPageA.js和subPageB.js的公共代码也异步,看10
// 如果subPageA.js和subPageB.js都依赖了库文件,
// 可以配合webpack.optimize.CommonsChunkPlugin
// 单入口分离库代码
require.include('./moduleA.js');
//require.include('lodash');

// require.ensure([dependencies],callback,chunkName);
// require.ensure会生产非入口chunk设置的新js文件(用于异步引入),
// chunkName是chunkFilename的
// 并且可以发现如果有多个require.ensure,依次加载完毕才进入下个require.ensure
// require.ensure(['./subPageA.js'], function () {
//     // 这个回调函数在加载完毕subPageA.js执行
//     // 如果不require,subPageA.js里面的东西就不会执行的
//     // 但是它会根据['./subPageA.js']把这个js文件加载到页面中来
//     // webpack.config.js需要设置下publicPath,这个路径是页面引入资源的前缀
//     console.log('加载完成subPageA.js');
//     var subPageA = require('./subPageA.js');
//     console.log(subPageA);
//     // _此时已经是全局变量了,感觉这样做不好...
//     console.log(_.join([1, 2], 3));
// }, 'subPageA');

// require.ensure(['./subPageB.js'], function () {
//     var subPageB = require('./subPageB.js');
//     console.log(subPageB);
//     //console.log(_.join([1, 2], 3));
// }, 'subPageB');

// // 写成空数组貌似没影响
// require.ensure([], function () {
//     console.log('加载完成subPageB.js');
//     var subPageB = require('./subPageB.js');
//     console.log(subPageB.default);
//     console.log(subPageB);
// }, 'subPageB');


// 只生成一个sunPageB文件
// require.ensure(['./subPageA.js'], function () {
//     var subPageA = require('./subPageA.js');
//     console.log(subPageA);
// }, 'subPageB');
// require.ensure(['./subPageB.js'], function () {
//     var subPageB = require('./subPageB.js');
//     console.log(subPageB);
// }, 'subPageB');

// 或者:
// require.ensure(['./subPageA.js','./subPageB.js'], function () {
//     var subPageA = require('./subPageA.js');
//     console.log(subPageA);
//     var subPageB = require('./subPageB.js');
//     console.log(subPageB);
// }, 'subPageB');

// 其实require.ensure和AMD规范差不多的功能,并不神奇
// AMD规范一样实现了依次执行
// 但是require.ensure是webpack的东西...尽量不混用吧
// 文件名不能自定义
require(['./subPageA.js'],function(subPageA){
    console.log('加载完成subPageA.js');
    console.log(subPageA);
});

// webpack.resolve.alias可以在webpack体系中的任何请求路径上使用
require(['Src/subPageB.js'],function(subPageB){
    console.log('加载完成subPageB.js');
    console.log(subPageB);
});

console.log('pageA');
export default 'pageA';
