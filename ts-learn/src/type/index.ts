// 布尔值
const isDone: boolean = false

// 数字
const count: number = 1

// 数组
// 方式一: 数组泛型
const list1: Array<number> = [1, 2, 4, 6]
// 方式二:
const list2: number[] = [2]
// 不可变数组
const list3: ReadonlyArray<number> = [1, 2, 4, 6]

// 元组Tuple
// 元组是表示已知元素数量和类型的数组
const tuple: [string, number] = ['hell0', 10]

// symbol
const sy: symbol = Symbol.for('a')

// 枚举
// 自动赋值0, 1, 2
enum Color { Red, Green, Blue }
const red: Color = Color.Red
const green: Color = Color.Green
console.log(red)
console.log(green)

// 手动赋值
enum Size { L = 1, M = 3, S = 5 }
const l: Size = Size.L
console.log(l)

// undefined,null
const u: undefined = undefined
const n: undefined = null

// any
let notSure: any = 3
notSure = true
console.log(notSure)

const anyList: any[] = [1, true]
anyList[1] = 100
console.log(anyList)

// void
function warn(): void {
  console.log('warn')
}
console.log(warn)

// never
function error(message: string): never {
  throw new Error(message)
}

// 类型断言
const someValue: any = 'a string'
const strLength: number = (<string>someValue).length
// 或者
const strLength1: number = (someValue as string).length
console.log(strLength)

// 类型别名
type Age = number
const num: Age = 300

type Person = {
  name: string,
  age: Age
}

const coder: Person = {
  name: 'd',
  age: 20
}

// 类别别名的并集
type Method = 'get' | 'post'
const method: Method = 'get'

// 类别别名的并集
type Cat = {
  name: string,
  purrs: boolean,
}

type Dog = {
  name: string,
  wags: boolean,
}

type CatOrDog = Cat | Dog

// 并集是其中一个或者所有(交集)
// 要么Cat要么Dog要么CatAndDog
const catOrDog: CatOrDog = {
  name: 's',
  wags: true,
  purrs: true,
}

type CatAndDog = Cat & Dog

// 交集是两者兼具
const catAndDog: CatAndDog = {
  name: 'g',
  purrs: true,
  wags: true,
}

const mixedArr: (string | number) [] = ['s', 1]

// 函数
type Log = (keyword: string) => boolean

const log: Log = function (keyword: string) {
  return true
}
// 或者
type Assert = {
  (keyword: string): boolean
}

const assert: Assert = function (keyword: string) {
  return true
}
