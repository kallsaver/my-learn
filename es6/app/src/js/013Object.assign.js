
//浅度克隆
let breakfast = {};
var a = {drink : '红茶',obj:{name : 'aaa'}};

Object.assign(
  breakfast,
  a
)

console.log(breakfast)

a.obj.name = 'bbb';

console.log(breakfast.obj.name)
