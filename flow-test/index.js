/* @flow */

// 类型大小写
function type(x: number, y: string, z: boolean) {

}

function Type(x: Number, y: String, z: Boolean) {

}

type(3, 's', true)
Type(new Number(3), new String('s'), new Boolean(true))

// 固定的值
function getColor(name: 'success' | 'warning') {
  switch(name) {
    case 'success': return 'green'
    case 'warning': return 'red'
  }
}

getColor('success')

// 混合类型,如果有操作符等运算,需要做判断类型
function stringify(value: mixed) {
  if (typeof value === 'string') {
    return ''
  } else if(typeof value === 'number') {
    return value + 2
  }
  return value
}

stringify('2')

// 任意类型
function add(x: any, y: any) {
  return x + y
}

add(2, 's')

// 数组
let arr: Array<number> = [1, 2]

function Man(options: Object) {
  this.Component = function () {

  }
}

function initMan(Man: Class<Component>) {
  Man.prototype.init = function () {
    const vm: Component = this
  }
}

initMan(Man)
