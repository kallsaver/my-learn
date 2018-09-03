(function (global, factory) {
    'use strict'
    console.log('global', global)
    // 基于CommonJs会有全局的module.exports和module的语法
    if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('存在module和module.exports')
        // noGlobal参数传入true,Hbuilder不会挂载在全局window对象上
        module.exports = global.document 
            ? factory(global, true)
            // 这是node的范畴
            : function (w) {
                if (!w.document) {
                    throw new Error('Hbuilder requires a window with a document')
                }
                return factory(w)
            }
    } else {
        console.log('不存在module和module.exports')
        console.log('直接引入走这条分支')
        factory(global)
    }
})(typeof window !== 'undefined' 
    ? window : this, function (window, noGlobal) {
    // 库代码
    var Hbuilder = {
        name: 'Hbuilder'
    }

    // AMD规范
    // AMD规范有define和define.amd的全局变量
    if (typeof define === 'function' && define.amd) {
        console.log('AMD规范执行')
        console.log(define.prototype)
        console.log('jquery-module的define.amd', define.amd)
        // 这个define的第一个字符串类型的参数是模块名,如果没有,是匿名模块
        // 直接写一个匿名函数作为参数也可以
        // 写了的话,requirejs.config配置path的命名只能用Hbuilder了
        define('Hbuilder', [], function () {
            console.log(111)
            return Hbuilder
        })
    }

    // !undefined === true
    if (!noGlobal) {
        console.log('Hbuilder挂载在window上')
        window.Hbuilder = window._ = Hbuilder
    }
    
    return Hbuilder
})