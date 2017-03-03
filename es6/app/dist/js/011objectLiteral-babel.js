'use strict';

var dessert = '蛋糕',
    drink = '红茶',
    num = 1;

var food = {
  dessert: dessert,
  drink: drink,
  number: num,
  breakfast: function breakfast() {},
  run: function run(a) {
    return this[a];
  }
};

console.log(food);

console.log(food.run('drink'));