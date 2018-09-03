// AMD和CommonJs是兼容的,module.exports,exports这些语法都是相通的
// CommonJs现加载现用
// AMD可以使用return语法导出一个文件对象
define(function (require, exports, module) {
    'use strict';
    console.log('AMD规范');
    console.log(exports, module);
    var obj = {
        multi: function(a,b){
            return a * b
        },
        multi1: function(a,b){
            return a * b
        },
        multi2: function(a,b){
            return a * b
        },
        num1 : 0,
        num2 : 0,
    }

    setTimeout(function(){
        obj.num1++;
        obj.num2++;
    },500);

    //return obj;
    // 或者
    //module.exports = obj;
    // 或者
    for(var key in obj){
        exports[key] = obj[key];
    }

    setTimeout(function(){
        exports.num1++;
        exports.num2++;
    },500);
    
});