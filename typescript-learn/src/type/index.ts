// 布尔值
const isDone: boolean = false

// 数字
const count: number = 1

// 数组
const list1: Array<number> = [1, 2, 4, 6]
const list2: number[] = [2]

// 对象
const obj: object = {}

// undefined,null
const u: undefined = undefined
const n: undefined = null

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

// 断言
const someValue: any = 'a string'
const strLength: number = (<string>someValue).length
// 或者
const strLength1: number = (someValue as string).length
console.log(strLength)
