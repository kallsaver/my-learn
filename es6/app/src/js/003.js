
'use strict';
//ES6解构
//数组
function breakfast(){
  return ['蛋糕','苹果','豆浆']
}
//dessert,drink,fruit外围没有{},所以是全局变量了
let [dessert,drink,fruit] = breakfast();

console.log(dessert,drink,fruit);

let [a,b,c] = [1,2,3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo,bar,baz)

//let和const一样,不能重复声明
//let foo = 4;

//...spread操作符 相当于降维
let[head,...tail] = [1,2,3,4]
console.log(head,tail);

let [f] = [];
//解构失败会等于undefined
console.log(f);

//右边如果是number,boolean,NaN,undefined,null,{}不可以遍历的结构都会报错
//let [k] = 1;

//不完全解构
let [x,y] = [1,2,3];
console.log(x,y);    //1,2

let [a1,[b1],c1] = [1,[2,3],4];
console.log(a1,b1,c1);    //1,2,4




//对象
//不需要按照顺序
// function breakfast(){
//   return {desser : '蛋糕', fruit :'苹果', drink :'豆浆',nothing : 'nothing'};
// }
// //编译为新var一个对象拿到返回值,新var4个该对象的key变量拿到这个对象的对应的value
// let {dessert : dessert, drink : drink, fruit: fruit,k : k}
//   = breakfast();
//
// console.log(dessert,drink,fruit);
