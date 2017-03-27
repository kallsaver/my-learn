'use strict';

var _console;

var fruits = ['苹果', '香蕉'];

//相当于把数组展开了,有点像apply降维
(_console = console).log.apply(_console, fruits);

var foods = ['蛋糕'].concat(fruits);
console.log(foods);