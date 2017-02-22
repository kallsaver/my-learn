
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (true) {
  //let块级作用域,只在{}中有效
  //编译的处理是var _fruit = 1;区分全局下的fruit
  var _fruit = 1;
}

//console.log(fruit);

{
  //let声明的变量只在它的代码块中有效
  var _a = 10;
  var b = 1;
}

//console.log(a)
console.log(b);

//for循环的计数器,就很适合使用let命令
for (var _i = 0; _i < 10; _i++) {};
//console.log(i)


var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    //这个函数运行的时候i变到10了,而var不是块作用域,所以i可以访问
    console.log(i);
  };
}

a[6](); //10

var b = [];

var _loop = function _loop(j) {
  b[j] = function () {
    console.log(j);
  };
};

for (var j = 0; j < 10; j++) {
  _loop(j);
}
b[6]();

//let没有变量提升
console.log(foo);
var foo = 2;

//不要使用babel编译后的js文件,使用src中的js文件看结果
// console.log(bar);
// let bar =2;


//let声明的变量不再受外部的影响,所以在tmp没声明就++会报错
var tmp = 123;
if (true) {
  tmp++;
  console.log(tmp);
  //let tmp = 1;
}
//undefined是类型
console.log(typeof ddf === 'undefined' ? 'undefined' : _typeof(ddf));

//为什么需要块级作用域:
//1.循环中的i只用来控制循环
//但是循环结束后，它并没有消失，泄露成了全局变量
//2.bug:
var tmp = 1;

function f() {
  console.log(tmp); // undefined
  if (false) {
    //虽然if语句没有执行,但是tmp却在f中声明了tmp并且提升了
    var tmp = "hello world";
  }
}

f();

function f1() {
  var n = 5;
  if (true) {
    var _n = 10;
  }
  console.log(n); // 5
}

f1();

//自运行函数写法改为
var kk = 10;
(function () {
  var kk = 1;
  console.log(kk);
})();

{
  var _kk = 1;
  console.log(_kk);
}

//声明函数在ES5和ES6的不同(谷歌已经使用ES6语法了)
// function f5() { console.log('I am outside!'); }
// (function () {
//   if (false) {
//     //即使if语句没有执行,里面声明变量和有名函数也会提升
//     var f5 = function () { console.log('I am inside!'); }
//   }
//
//   f5();  //f5 is not a function
// }());

function f6() {
  console.log('I am outside!');
}
(function () {
  //ES6下的函数声明同样不能跳出{}
  if (false) {
    // 重复声明一次函数f
    var _f = function _f() {
      console.log('I am inside!');
    };
  }

  f6(); //'I am outside!'
})();