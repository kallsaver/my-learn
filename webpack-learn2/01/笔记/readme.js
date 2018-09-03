// module.exports和export和export default之间的关系和区别

// 参考文献:https://www.cnblogs.com/fayin/p/6831071.html
// 参考文献:https://segmentfault.com/a/1190000010426778
// 参考文献:https://blog.csdn.net/xcymorningsun/article/details/52709608
// 参考文献:https://www.zhihu.com/question/56820346/answer/150743994


// 本文基于命令webpack app.js bundle.js
// 首先CommonJs模块规范和ES6模块规范完全是两种不同的概念

// 1.CommonJs模块规范  module.exports
// Node应用由模块组成,采用CommonJs模块规范
// 根据这个规范规定,每一个文件就是一个模块,有自己的作用域.
// 在一个文件李明明定义的变量、函数、类都是私有的,对其他文件不可见
// Commjs规范规定,每个模块内部,module变量代表当前模块.
// 这个变量是一个对象,它的exports属性(即module.exports)是对外的接口
// 加载某个模块,其实是加载该模块的module.exports属性.
// require方法用于加载模块.
// 例如
// 在a.js中:
// module.exports.x = 5
// 在b.js中:
// var a = require('./a.js');
// console.log(a); // 5


// 2.module.exports与exports
// 为了方便,Node为每一个模块提供一个exports变量.
// 这等同于在每个模块头部，有一行这样的命令:
// var exports = module.exports;
// 于是我们可以直接在exports对象上添加方法,表示对外输出的接口,
// 如同在module.exports上添加一样.
// 注意,不能直接将exports变量指向一个值,
// 因为这样等于切断exports与module.exports的联系
// exports的指针不再是module.exports
// 所以最好统一用module.exports


// ES6模块规范
// 不同于CommonJs,ES6使用export和import来导出、导入模块
// var firstName = 'firstName';
// var lastName = 'lastName';
// var year = 2018;
// export {firstName, lastName, year};
// 需要特别注意的是,export命令规定的是对外的接口,
// 必须与模块内部的变量建立一一对应关系

// 写法1:
// export var m = 1;
// 写法2:
// var m = 1;
// export {m};
// 写法3:
// var n = 1;
// export {n as m};


// 3.

