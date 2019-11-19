/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cc", function() { return c; });
/* harmony export (immutable) */ __webpack_exports__["square"] = square;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });

console.log('tool.js运行');
// 1.export
// 导出常量
// 写法一:
const a = 1;
/* harmony export (immutable) */ __webpack_exports__["a"] = a;


// 写法二:
var b = 2;
// 一定是输出一个对象,和import{b}对应


// 写法三:
var c = 3;
// as重命名
// cc这个变量在import接口时的变量名(标识符)



// 导出函数
function square(a){
    return a * a
}

var add = function(a,b){
    return a + b;
}

// 2.export可以有多个,export default是唯一的
// export和export default没冲突
// 但是如果有多个export default会报错
// 所以无论从代码的可读性还是import出来的名字标识,
// (使用export可能会导致模块命名相同的问题)
// 推荐使用export default
// 参考cube-ui,出了假数据使用export之外,其它地方都是使用export default
// 使用export default相当于这个js文件的所有模块都会被使用到
// 而export不会,在webpack的插件webpack.optimize.UglifyPlugin可以把export没用到的代码不打包
 var name = 'name';
//export default name;

function subdution(a,b){
    return a - b;
}

var count = 0;

var person = {
    name,
    //add,
    subdution,
    count,
}

setTimeout(function(){
    person.count++
},500);

setTimeout(function(){
    console.log(person.count);
},2000);

/* harmony default export */ __webpack_exports__["default"] = (person);






/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// AMD和CommonJs是兼容的,module.exports,exports这些语法都是相通的
// CommonJs现加载现用
// AMD可以使用return语法导出一个文件对象
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, module) {
  'use strict'
  console.log('AMD规范')
  console.log(exports, module)
  var obj = {
    multi: function(a, b) {
      return a * b
    },
    multi1: function(a, b) {
      return a * b
    },
    multi2: function(a, b) {
      return a * b
    },
    num1 : 0,
    num2 : 0,
  }

  setTimeout(() => {
    obj.num1++
    obj.num2++
  }, 500)

  // return obj
  // 或者
  // module.exports = obj
  // 或者
  for(var key in obj) {
    exports[key] = obj[key]
  }

  setTimeout(() => {
    exports.num1++
    exports.num2++
  }, 500)
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {



var name = 'b.js'

// module.exports = {
//     name : name
// }

// setTimeout(function(){
//   // 无效,module.exports只能生效一次,意味着结束
//   module.exports = {
//     name: 'new name'
//   }
// }, 500)

// 或者
exports.name = name
exports.count1 = 0
exports.count2 = 0
setTimeout(() => {
  exports.count1++
  exports.count2++
  console.log('exports.count1',exports.count1)
  console.log('exports.count2',exports.count2)
}, 500)


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__a__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tool__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__b__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__b___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__b__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__c__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__c___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__c__);

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

 
 console.log('a.js',__WEBPACK_IMPORTED_MODULE_0__a__["a"],__WEBPACK_IMPORTED_MODULE_0__a__["b" /* d */])

// import {square, a, b, cc, add} from './tool'

// console.log('square(4)=',square(4))

// console.log('add(4,5)=',add(4,5))

// console.log('a',a)

// console.log('b',b)

// console.log('cc',cc)

// console.log('d',d)

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
//import obj from './tool'
//console.log(obj)

// 名字也可以不和导入文件的导出变量名一样
 
 console.log('person1',__WEBPACK_IMPORTED_MODULE_1__tool__["default"])
 var person2 = __webpack_require__(0)
 console.log('person2',person2)
 
 console.log('person3',__WEBPACK_IMPORTED_MODULE_1__tool__)
 console.log(person2 === __WEBPACK_IMPORTED_MODULE_1__tool__) // true

// import * as xx from 是把所有的export都放入一个对象中,然后导出
// 即如果一个库不是用export default来输出的,可以用import * as xx来补救

// 因为导出的语法是Es6 Module,
// require会被编译成import * as x from 'x'
var all1 = __webpack_require__(0)
console.log('all',__WEBPACK_IMPORTED_MODULE_1__tool__)
console.log('all1',all1)
console.log(__WEBPACK_IMPORTED_MODULE_1__tool__ === all1)
setTimeout(function(){
    __WEBPACK_IMPORTED_MODULE_1__tool__["default"].count += 100
},1000)
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
var b = __webpack_require__(2)
console.log('b',b)

console.log('b1',__WEBPACK_IMPORTED_MODULE_2__b___default.a)

console.log('b2',__WEBPACK_IMPORTED_MODULE_2__b__)
console.log('b ===  b1', b ===  __WEBPACK_IMPORTED_MODULE_2__b___default.a)  // true
console.log('b1 ===  b2', __WEBPACK_IMPORTED_MODULE_2__b___default.a === __WEBPACK_IMPORTED_MODULE_2__b__) // true

// setTimeout(function(){
//     console.log('b',b.name) // b.js
//     console.log('b1',b1.name) // b.js
// },1000)

// CommonJs也可以用花括号
const { count1 } = __webpack_require__(2)

setTimeout(function(){
    // CommonJs是普通的值传递或者引用传递,使用基本数据类型时要注意
    console.log('count1',count1) // 0
    // ES6 Module导出的模块属性和方法是强绑定的,使用基本数据类型时要注意
    console.log('count2',__WEBPACK_IMPORTED_MODULE_2__b__["count2"]) // 1
},1000)


// amd   amd是异步加载模块
// 并且在git的窗口发现有0.bundle.js和bundle.js
// 并且可以看到在浏览器Network中先加载bundle.js再加载0.bundle.js
new Promise(function(resolve) { resolve(); }).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1)]; ((function(c){
    console.log('amd')
    console.log('c.multi(2,3)=',c.multi(2,3))
}).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe)

// 用require,import一样可以转导出用AMD的语法,只不过变成同步了

var c2 = __webpack_require__(1)

console.log('c1',__WEBPACK_IMPORTED_MODULE_3__c__)
console.log('c2',c2)
console.log('c3',__WEBPACK_IMPORTED_MODULE_3__c___default.a)


let { num2 } = __webpack_require__(1)
setTimeout(() => {
  // 基本数据类型强绑定是ES6 module的特征
  console.log('num1', __WEBPACK_IMPORTED_MODULE_3__c__["num1"] ) // 1
  console.log('num2', num2 ) // 0
}, 1000)

// 1.CommonJs还是ES6 Module输出都可以看成一个具备多个数据或者方法的对象
// 2.default是ES6 Module所独有的关键字,export fs from 'fs'输出默认的接口对象
// 3.import和require可以混用,
// 如果是用ES6 Module导出,require相当于于import * as X from 'X'
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









/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
/* unused harmony export b */
/* unused harmony export c */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return d; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tool_js__ = __webpack_require__(0);




var a = 4;

var b = 5;

var c = 6;

var d = Object(__WEBPACK_IMPORTED_MODULE_0__tool_js__["add"])(b,c);

console.log('a.js运行');



/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);