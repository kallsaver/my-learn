
// 一个完整的调用签名,T的作用域在单个签名中,ts将在调用FilterA类型的函数时为签名
// 中的T绑定具体类型,每次调用FilterA将为T绑定独立的类型
// type FilterA = {
//   <T>(array: T[], f: (item: T) => boolean): T[]
// }

// 简写
type FilterA = <T>(array: T[], f: (item: T) => boolean) => T[]

const filterA: FilterA = <T>(arr: T[], fn: (item: T) => boolean): T[] => {
  const result: T[] = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (fn(item)) {
      result.push(item)
    }
  }
  return result
}

console.log(filterA([1, 3], (item) => {
  return item > 2
}))

// 一个完整的调用签名,T的作用域覆盖全部签名,由于T是FilterB的一部分,
// 因此ts将在申明FilterB类型的时候绑定签名
type FilterB<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}

const filterB: FilterB<number> = (arr, fn) => {
  const result: number[] = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (fn(item)) {
      result.push(item)
    }
  }
  return result
}

function filter<T>(arr: T[], fn: (item: T) => boolean): T[] {
  const result: T[] = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (fn(item)) {
      result.push(item)
    }
  }
  return result
}

const ret = filter([1, 3], (item) => {
  return item > 2
})

console.log(ret)
