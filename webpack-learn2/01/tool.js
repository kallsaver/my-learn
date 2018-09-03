
console.log('tool.js运行');
// 1.export
// 导出常量
// 写法一:
export const a = 1;

// 写法二:
var b = 2;
// 一定是输出一个对象,和import{b}对应
export {b};

// 写法三:
var c = 3;
// as重命名
// cc这个变量在import接口时的变量名(标识符)
export {c as cc};


// 导出函数
export function square(a){
    return a * a
}

export var add = function(a,b){
    return a + b;
}

// 2.export可以有多个,export default是唯一的
// export和export default没冲突
// 但是如果有多个export default会报错
// 所以无论从代码的可读性还是import出来的名字标识,
// (使用export可能会导致模块命名相同的问题)
// 推荐使用export default
// 参考cube-ui,出了假数据使用export之外,其它地方都是使用export default
// 使用export default相当于这个js文件的所有模块都会被使用到
// 而export不会,在webpack的插件webpack.optimize.UglifyPlugin可以把export没用到的代码不打包
 var name = 'name';
//export default name;

function subdution(a,b){
    return a - b;
}

var count = 0;

var person = {
    name,
    //add,
    subdution,
    count,
}

setTimeout(function(){
    person.count++
},500);

setTimeout(function(){
    console.log(person.count);
},2000);

export default person;




