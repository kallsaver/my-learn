
'use strict';

//数组
// function breakfast(){
//   return ['蛋糕','苹果','豆浆']
// }
//dessert,drink,fruit外围没有{},所以是全局变量了
// let [dessert,drink,fruit] = breakfast();
//
// console.log(dessert,drink,fruit);


//对象
function breakfast(){
  return {desser : '蛋糕', fruit :'苹果', drink :'豆浆',nothing : 'nothing'};
}
//编译为新var一个对象拿到返回值,新var4个该对象的key变量拿到这个对象的对应的value
let {dessert : dessert, drink : drink, fruit: fruit,k : k}
  = breakfast();

console.log(dessert,drink,fruit);
