
'use strict';

function breakfast() {
  var dessert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '蛋糕';
  var drink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '奶茶';

  return dessert + ' ' + drink;
}

console.log(breakfast());

console.log(breakfast('豆浆'));

// ... 剩余参数会放在一个数组里
function run(num1, num2) {
  console.log(num1);
  console.log(num2);

  for (var _len = arguments.length, numothers = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    numothers[_key - 2] = arguments[_key];
  }

  console.log(numothers);
}

run(5, 4, 7, 9);