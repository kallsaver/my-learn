'use strict';

let dessert = '蛋糕', drink = '奶茶';

let breakfast = '今天的早餐是' + dessert + '和' + drink + '!'

console.log(breakfast);

//``定义的字符串可以随意的回车换行,是模板字符串,用于字符画很方便
let breakfast2 = `今天的早餐是
  ${dessert}和${drink}?`;

console.log(breakfast2);

let a = `dd`;

console.log(typeof a);

let breakfast3 = kitchen`今天的早餐是
  ${dessert}和${drink}?`;

function kitchen(strings,...values) {
  console.log(strings);
  console.log(values);
}
