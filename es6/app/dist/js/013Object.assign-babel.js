'use strict';

//浅度克隆
var breakfast = {};
var a = { drink: '红茶', obj: { name: 'aaa' } };

Object.assign(breakfast, a);

console.log(breakfast);

a.obj.name = 'bbb';

console.log(breakfast.obj.name);