'use strict';

let fruits = ['苹果','香蕉'];

//相当于把数组展开了,有点像apply降维
console.log(...fruits);

let foods = ['蛋糕',...fruits];
console.log(foods);
