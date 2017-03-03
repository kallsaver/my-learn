
'use strict';
//ES6解构
//数组

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function breakfast() {
  return ['蛋糕', '苹果', '豆浆'];
}
//dessert,drink,fruit外围没有{},所以是全局变量了

var _breakfast = breakfast(),
    _breakfast2 = _slicedToArray(_breakfast, 3),
    dessert = _breakfast2[0],
    drink = _breakfast2[1],
    fruit = _breakfast2[2];

console.log(dessert, drink, fruit);

var a = 1,
    b = 2,
    c = 3;
var foo = 1,
    bar = 2,
    baz = 3;

console.log(foo, bar, baz);

//let和const一样,不能重复声明
//let foo = 4;

//...spread操作符 相当于降维
var head = 1,
    tail = [2, 3, 4];

console.log(head, tail);

var _ref = [],
    f = _ref[0];
//解构失败会等于undefined

console.log(f);

//右边如果是number,boolean,NaN,undefined,null,{}不可以遍历的结构都会报错
//let [k] = 1;

//不完全解构
var _ref2 = [1, 2, 3],
    x = _ref2[0],
    y = _ref2[1];

console.log(x, y); //1,2

var a1 = 1,
    _ref3 = [2, 3],
    b1 = _ref3[0],
    c1 = 4;

console.log(a1, b1, c1); //1,2,4


//对象
//不需要按照顺序
// function breakfast(){
//   return {desser : '蛋糕', fruit :'苹果', drink :'豆浆',nothing : 'nothing'};
// }
// //编译为新var一个对象拿到返回值,新var4个该对象的key变量拿到这个对象的对应的value
// let {dessert : dessert, drink : drink, fruit: fruit,k : k}
//   = breakfast();
//
// console.log(dessert,drink,fruit);