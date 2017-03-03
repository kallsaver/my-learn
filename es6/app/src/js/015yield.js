//生成器函数
function* numbers(){
  console.log('函数开始执行');
  //yield和return有点像
  var v1 = yield 4;           //有暂停,next会返回一个对象
  console.log('v1 = ' + v1);

  var v2 = yield 3;
  console.log('v2 =' +v2);    //有暂停,next会返回一个对象

  return 5;
}

var nums = numbers();
//console.log(nums);

console.log(nums.next(2));

console.log(nums.next(3));

console.log(nums.next(4));

// console.log(nums.next(5));
