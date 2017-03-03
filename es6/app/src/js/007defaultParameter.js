
'use strict';

function breakfast(dessert = '蛋糕',drink = '奶茶'){
  return `${dessert} ${drink}`;
}

console.log(
  breakfast()
)

console.log(
  breakfast('豆浆')
)

// ... 剩余参数会放在一个数组里
function run(num1,num2,...numothers){
  console.log(num1);
  console.log(num2);
  console.log(numothers)
}

run(5,4,7,9)
