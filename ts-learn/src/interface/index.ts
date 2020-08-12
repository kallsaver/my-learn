interface SquareConfig {
  readonly name: string
  color?: string
  width?: number
  getWidth: () => number
  // 其它字段跳过类型检查
  [propName: string]: any
}

function createSquare(config: SquareConfig): SquareConfig {
  config.width += 100
  return config
}

createSquare({
  name: 'ti',
  color: 'red',
  width: 300,
  height: 100,
  // this不是参数,是函数签名
  getWidth(this: SquareConfig): number {
    return this.width
  }
})

// 可索引类型
interface StringArray {
  // 元素全部为字符串类型
  [index: number]: string
}

const arr: StringArray = ['a', 'b']

// 函数类型接口
interface SearchFunc {
  (keyword: string): boolean
}

const search: SearchFunc = function (keyword: string): boolean {
  return keyword.length > 2
}

// 类类型接口
interface Food {
  calories: number
  tasty: boolean
}

// 接口继承接口,相当于类型交集
interface Sushi extends Food {
  salty: boolean
}

const sushi: Sushi = {
  calories: 1,
  tasty: true,
  salty: true
}

// 接口申明合并
interface User {
  name: string
}

interface User {
  id: string
}

const user: User = {
  id: '0',
  name: 'ue'
}
