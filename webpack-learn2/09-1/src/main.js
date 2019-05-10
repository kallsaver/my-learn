//import "./subPageA";
//import "./subPageB";
import 'babel-polyfill';
import * as _ from 'lodash';
import * as $ from 'jquery';
import moduleA from './moduleA';
var path = require('path');
var treeify = require('treeify');

// CommonJs循环引用的问题,貌似博客写得不对
// https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html
var c = require('./CommonJs/c');

//console.log(process.env)

console.log('A', A);
console.log(A1);
console.log(A2);
console.log(B, 'B');
console.log('B1', B1);
console.log(C);
console.log(D);
console.log(E);
console.log(F.env.name);
console.log(G);
console.log(H);
console.log(F);
console.log('I', I);
console.log(__filename);
console.log(path);
console.log(process);


function checkClass(o){
    return Object.prototype.toString.call(o).slice(8,-1)
}

// 对有len属性的哈希表进行深度转换
// 当然为了真数组和对象也是深度拷贝的
function parseRealArray(obj){
    var result

    if(checkClass(obj) === 'Array'){
        result = []
    }else if(checkClass(obj) === 'Object'){
        result = {}
    }else{
        return obj
    }

    for(var key in obj){
        var copy = obj[key]
        if(checkClass(copy) === 'Object' && copy.hasOwnProperty('Length')){
            // 如果是有Length属性的哈希表,进行转换成真数组
            var arr = []
            delete copy.Length
            Object.keys(copy).forEach(function (item) {
                arr.push(copy[item])
            })
            copy = arr
            result[key] = parseRealArray(copy)
        }else if(checkClass(copy) === 'Object' || checkClass(copy) === 'Array'){
            result[key] = parseRealArray(copy)
        }else{
            result[key] = copy
        }
    }
    return result
}

console.log(realObj)
console.log(parseRealArray(realObj))
console.log('fn',parseRealArray(realObj).fn())

console.log('checkClass',parseRealArray(realObj).checkClass([]))


var treeObj = {
    name: 'realObj',
    one: [1],
    ones: ['1'],
    arr: [1, 2, 3],
    is: true,
    a: {
        name: "a"
    },
    list: [
        {
            name: "d",
            cityList:[
                {
                    city: "beijing",
                    countyList: ["ddd","aaa","bbb"]
                },
                {
                    city: "hangzhou",
                    countyList: ["fff","ggg","ooo", {last: 'ddd'}]
                },
            ]
        }
    ],
    fn: checkClass
}

console.log(
    treeify.asTree(treeObj,true,false)
)

require(['./subPageA.js'],function(subPageA){
    console.log('加载完成subPageA.js');
    console.log(subPageA);
});

console.log('pageA');
export default 'pageA';
