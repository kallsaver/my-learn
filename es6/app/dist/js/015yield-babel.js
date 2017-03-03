'use strict';

var _marked = [numbers].map(regeneratorRuntime.mark);

//生成器函数
function numbers() {
  var v1, v2;
  return regeneratorRuntime.wrap(function numbers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('函数开始执行');
          //yield和return有点像
          _context.next = 3;
          return 4;

        case 3:
          v1 = _context.sent;
          //有暂停,next会返回一个对象
          console.log('v1 = ' + v1);

          _context.next = 7;
          return 3;

        case 7:
          v2 = _context.sent;

          console.log('v2 =' + v2); //有暂停,next会返回一个对象

          return _context.abrupt('return', 5);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var nums = numbers();
//console.log(nums);

console.log(nums.next(2));

console.log(nums.next(3));

console.log(nums.next(4));

// console.log(nums.next(5));