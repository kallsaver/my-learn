

var name = 'b.js';

// module.exports = {
//     name : name
// }

// setTimeout(function(){
//     // 无效,module.exports只能生效一次,意味着结束
//     module.exports = {
//         name: 'new name'
//     };
// },500);

// 或者
exports.name = name;
exports.count1 = 0;
exports.count2 = 0;
setTimeout(function(){
    exports.count1++;
    exports.count2++;
    console.log('exports.count1',exports.count1)
    console.log('exports.count2',exports.count2)
},500);
