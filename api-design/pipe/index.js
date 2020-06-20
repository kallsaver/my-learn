const arrProto = Array.prototype

arrProto.pipe = function (fn) {
  return this.map((item, index) => {
    return fn(item, index)
  })
}

function map(fn) {
  return function () {
    return fn(...arguments)
  }
}

const arr = [100, 101]

const result = arr.pipe(map((item, index) => {
  return item + 1
})).pipe((item, index) => {
  return item * 2
})

console.log(result)
