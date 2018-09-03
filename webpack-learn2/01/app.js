
// es6 module语法是export(没有s),使用的是同步的import引入,异步的amd规范
// CommonJs的语法是module.exports,使用的是同步的require引入


// es6 module

// 1.import ... from 有三种形式:
// A.导出文件对象的全部:import * as xx from './**'
// B.导出文件对象的default:import xx from './**'
// C.导出文件对象的某个export:import {xx} from './**'



// import如果使用花括号{},
// 那么导入的js文件一定是使用了export而不是export default
// 这样可能导致导入多个文件时,会出现命名冲突

 import {a,d} from './a';
 console.log('a.js',a,d);
 
// import {square, a, b, cc, add} from './tool';

// console.log('square(4)=',square(4));

// console.log('add(4,5)=',add(4,5));

// console.log('a',a);

// console.log('b',b);

// console.log('cc',cc);

// console.log('d',d);

// a.js依赖tool.js   最终的app.js依赖a.js和tool.js
// 可以看到tool.js只运行一次,
// 说明node.js会分析依赖文件并最终一个文件只会运行一次
// 相当于现在把所有依赖js文件根据依赖关系加载进来,
// 如果有重复的不再加载,而这些export暴露的js文件都是对象
// (export default可以是其它数据结构)
// 这些对象的属性(标识符)是被引入js文件的全局变量


// 使用export default导出,没有花括号,
// 可以是对象也可以其他数据结构
// es6 module
//import obj from './tool';
//console.log(obj);

// 名字也可以不和导入文件的导出变量名一样
 import person1 from './tool';
 console.log('person1',person1);
 var person2 = require('./tool');
 console.log('person2',person2);
 import * as person3 from './tool';
 console.log('person3',person3);
 console.log(person2 === person3); // true

// import * as xx from 是把所有的export都放入一个对象中,然后导出
// 即如果一个库不是用export default来输出的,可以用import * as xx来补救
import * as all from './tool';
// 因为导出的语法是Es6 Module,
// require会被编译成import * as x from 'x';
var all1 = require('./tool');
console.log('all',all);
console.log('all1',all1);
console.log(all === all1);
setTimeout(function(){
    all.default.count += 100;
},1000);
// all的数据结构：
// {
//     a: 1,
//     add: function(){},
//     ...
//     default: {
//         name: 'name',
//         subdution: function(){}
//     }
// }

// CommonJs
var b = require('./b');
console.log('b',b);
import b1 from './b';
console.log('b1',b1);
import * as b2 from './b';
console.log('b2',b2);
console.log('b ===  b1', b ===  b1);  // true
console.log('b1 ===  b2', b1 === b2); // true

// setTimeout(function(){
//     console.log('b',b.name); // b.js
//     console.log('b1',b1.name); // b.js
// },1000);

// CommonJs也可以用花括号
const { count1 } = require('./b');
import { count2 } from './b';
setTimeout(function(){
    // CommonJs是普通的值传递或者引用传递,使用基本数据类型时要注意
    console.log('count1',count1); // 0
    // ES6 Module导出的模块属性和方法是强绑定的,使用基本数据类型时要注意
    console.log('count2',count2); // 1
},1000);


// amd   amd是异步加载模块
// 并且在git的窗口发现有0.bundle.js和bundle.js
// 并且可以看到在浏览器Network中先加载bundle.js再加载0.bundle.js
require(['./c'],function(c){
    console.log('amd');
    console.log('c.multi(2,3)=',c.multi(2,3));
});

// 用require,import一样可以转导出用AMD的语法,只不过变成同步了
import * as c1 from './c';
var c2 = require('./c');
import c3 from './c';
console.log('c1',c1);
console.log('c2',c2);
console.log('c3',c3);

import { num1 } from './c';
var { num2 } = require('./c');
setTimeout(function(){
    // 基本数据类型强绑定是ES6 module的特征
    console.log( 'num1', num1 ); // 1
    console.log( 'num2', num2 ); // 0
},1000)

// 1.CommonJs还是ES6 Module输出都可以看成一个具备多个数据或者方法的对象 
// 2.default是ES6 Module所独有的关键字,export fs from 'fs'输出默认的接口对象
// 3.import和require可以混用,
// 如果是用ES6 Module导出,require相当于于import * as X from 'X';
// 如果是用CommmonJs导出,import相当于require
// 4.ES6 Module中导入模块的属性或者方法是强绑定的,包括基础类型,而CommonJs则是
// 普通的值传递或者引用传递,用import导出基本数据类型是要注意(兼容CommonJs,ES6 Module,AMD导出)
// 5.使用CommonJs导出的库,对应的导入应该用require,
// 兼容导入用import x from 'x'和import as x from 'x'和AMD都可以
// 6.使用ES6 Module导出的库,有default和没default之分,使用import x from 'x'可以导出default部分
// 使用import * as x from 'x'可以导出全部属性,使用花括号import{ a, b } from 'x'可以导出局部属性
// 使用require导出全部属性,使用var { a } = require('./x')通常传参的方式导出局部的变量
// 7.使用AMD导出的库,对应的导入应该用AMD语法,
// 兼容导入用import x from 'x'和import as x from 'x'和CommonJs的require都可以,但是变同步
// 8.兼容CommonJs,AMD,ES6 Module的库封装看18章







