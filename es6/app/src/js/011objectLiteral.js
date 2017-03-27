'use strict';

let dessert = '蛋糕', drink = '红茶',num = 1;


let food = {
  dessert,
  drink,
  number : num,
  breakfast(){},
  run(a){return this[a]}
};

console.log(food);

console.log(food.run('drink'))
