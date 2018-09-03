
import 'babel-polyfill';

let func = () => {};
const NUM = 45;
let arr = [1, 2, 4];
let arrB = arr.map(item => item * 2);

console.log('new Set(arrB)', new Set(arrB));

var option = {
    name(){
        console.log('es6属性方法解构写法');
    },
    selfRun: (function(){
        console.log('自运行函数');
        return 1;
    })()
}

console.log(option);
option.name();


var def = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('打得动')
    },2000);
});

def.then(function(){
    console.log()
})
