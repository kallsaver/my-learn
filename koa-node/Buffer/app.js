// Buffer
// https://www.jianshu.com/p/6a0bb73f2d64

// Buffer的用法跟数组相似
// 生成一个Buffer,用Buffer.from,支持简单数组和字符串
// 不支持复杂的数据结构(需要先转成字符串)

let buf1 = Buffer.from([1])
console.log(buf1)
let json1 = buf1.toJSON()
// { type: 'Buffer', data: [1]}
console.log(json1)
let buf01 = Buffer.from('a')
console.log(buf01)
let json01 = buf01.toJSON()
console.log(json01)

let buf2 = Buffer.from('he')
console.log(buf2)
let json2 = buf2.toJSON()
// { type: 'Buffer', data: [1]}
console.log(json2)

let str3 = [{ list: [1, 2], total: 6 }].join('')
let buf3 = Buffer.from(str3)
let jsonStr3 = buf3.toString()
console.log(jsonStr3)
