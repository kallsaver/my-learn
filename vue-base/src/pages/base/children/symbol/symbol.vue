<template>
  <page
    :title="$route.meta.title">
    <div class="class">
    </div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo4()
  },
  methods: {
    demo1() {
      // Symbol是es6新的数据类型,属于基本数据类型
      // 上下文中独一无二的值
      const name = Symbol('name')
      // console.log(name)
      const person = {}
      person[name] = 'name'
      person.city = 'sz'
      for (const key in person) {
        // 无法枚举Symbol
        console.log(key)
      }
      // 只能getter
      console.log(person[name])
      console.log(person)
    },
    demo2() {
      // 如果想再一个应用中共享同一个Symbol,应该用Symbol
      // Symbol会在全局的Symbol注册表中搜索键为uid的Symbol,如果有则返回,没有则创建
      // 还可以用Symbol.keyFor检索,如果检索不到返回undefined

      const a = Symbol.for('uid')
      const b = Symbol.for('uid')
      console.log(a === b)

      // 返回uid
      console.log(Symbol.keyFor(a))
    },
    demo3() {
      // Symbol无法转数字

      // 可以转字符串
      const name = Symbol.for('name')
      // Symbol(name)
      console.log(String(name))

      // 转boolean为true
      const bo = Symbol.for('bo')
      console.log(Boolean(bo))
    },
    demo4() {
      const arr = []
      // es6的instanceof操作符其实是Symbol.hasInstance的简写
      console.log(arr instanceof Array)
      // 等价于
      console.log(Array[Symbol.hasInstance](arr))

      // 改写instanceof的判断
      function SpecialNumber() {

      }

      Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
        value(v) {
          return (v instanceof Number) && (v >= 1 && v <= 100)
        }
      })
      /* eslint-disable */
      const n1 = new Number(0)
      const n2 = new Number(2)

      console.log(n1 instanceof SpecialNumber)
      console.log(n2 instanceof SpecialNumber)
      console.log(n1)
    },

  },
}
</script>

<style>

</style>
