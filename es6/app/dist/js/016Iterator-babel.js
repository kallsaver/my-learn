'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Iterator是迭代器的意思

function makeIterator(arr) {
  var nextIndex = 0;
  return {
    next: function next() {
      return nextIndex < arr.length ? { value: arr[nextIndex++], done: false } : { value: undefined, done: true };
    }
  };
}

var it = makeIterator(['a', 'b', 'c', 'd']);

console.log(it.next()); //{value : 'a', done :false}
console.log(it.next()); //{value : 'b', done :false}
console.log(it.next()); //{value : 'c', done :false}
console.log(it.next()); //{value : 'd', done :false}
console.log(it.next()); //{value : undefined, done :true}

var a = 1;
var b = a++;
console.log(b); //1 先赋值 a再++
console.log(a);

var obj = {
  num: b++
};

console.log(b); //2 obj.num拿到的是b++的映射 所以先++

//ES6中,有三类数据结构原生具备Iterator接口:数组,类数组,Set和Map结构
var arr = ['a', 'b', 'c'];
//新的数据类型 Symmbol
console.log(_typeof(Symbol.iterator));
var iter = arr[Symbol.iterator]();

console.log(iter.next());