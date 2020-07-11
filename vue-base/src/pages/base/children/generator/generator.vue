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
    this.demo11()
  },
  methods: {
    demo0() {
      const obj = {
        b: 'b',
        0: '0',
        1: '1',
        c: 'c',
      }
      obj.a = 'a'
      // 按照数字-字母-后增元素迭代
      // 无法做到按照特定顺序迭代
      // 而数组的遍历需要额外副作用的下标
      for (const key in obj) {
        console.log(key)
      }
    },
    demo1() {
      // 什么是迭代器
      function createIterator(list) {
        let i = 0
        return {
          next() {
            const done = i >= list.length
            const value = !done ? list[i++] : undefined
            return {
              done,
              value,
            }
          }
        }
      }
      const iterator = createIterator([0, 1, 2])

      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
    },
    demo2() {
      // es6自带的迭代器
      function *createIterator() {
        // yield只能在*中使用
        yield 0
        yield 1
        yield 2
      }

      const iterator = createIterator()

      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
      // function
      console.log(typeof createIterator)
    },
    demo3() {
      function *createIterator(list) {
        for (let i = 0; i < list.length; i++) {
          yield list[i]
        }
      }
      const iterator = createIterator([0, 1, 2])

      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
    },
    demo4() {
      // value可以是数组,字符串,Set,Map等可以迭代的数据结构
      // 或者说原型链上有Symbol.iterator的数据结构
      // Symbol.iterator是个函数,会根据数据结构的length生产迭代器
      const value = '123'
      const iterator = value[Symbol.iterator]()
      console.log(iterator.next())
      console.log(iterator.next())
      console.log(iterator.next())
      // for of可以遍历迭代器类型的数据结构
      for (const item of value) {
        console.log(item)
      }
    },
    demo5() {
      // 可以迭代的数据结构
      function isIterable(o) {
        return typeof o[Symbol.iterator] === 'function'
      }
      // true
      console.log(isIterable([]))
      // true
      console.log(isIterable(''))
      // true
      console.log(isIterable(new Map()))
      // true
      console.log(isIterable(new Set()))
      // false
      console.log(isIterable(new WeakMap()))
      // false
      console.log(isIterable(new WeakSet()))
    },
    demo6() {
      // 创建自定义可迭代对象
      const collection = {
        list: [0, 1, 2],
        // 给for...of接口消费
        *[Symbol.iterator]() {
          // for (let item of this.list) {
          //   yield item
          // }
          // 或者
          /* eslint-disable */
          // 委托(合并)迭代器
          // yield *一个迭代器,会迭代提取里面的value生成新的yield体
          yield *this.list.values()
        }
      }
      // 由此可以看出for of是迭代完实例上的[Symbol.iterator]()
      for (const item of collection) {
        console.log(item)
      }
    },
    demo7() {
      // 创建自定义可迭代对象
      // 由此可见iterator的作用是:
      // 1.为各种数据结构,提供一个统一的,简便的迭代接口
      // 2.使得迭代时能安装一定顺序排序
      // 3.供for of消费

      const collection = {
        list: [0, 1, 2],
        // 给for...of接口消费
        [Symbol.iterator]() {
          const list = this.list
          let i = 0
          // 返回一个迭代器(迭代器的本质)
          return {
            next() {
              const done = i >= list.length
              const value = !done ? list[i++] : undefined
              return {
                done,
                value,
              }
            }
          }
        }
      }
      for (const item of collection) {
        console.log(item)
      }
    },
    demo8() {
      // 创建自定义可迭代对象
      const collection = {
        list: [0, 1, 2],
        // 给for...of接口消费
        *[Symbol.iterator]() {
          const list = this.list
          let i = 0
          /* eslint-disable */
          // 委托(合并)迭代器
          // yield *一个迭代器,会迭代提取里面的value生成新的yield体
          yield * {
            next() {
              const done = i >= list.length
              const value = !done ? list[i++] : undefined
              return {
                done,
                value,
              }
            }
          }
        }
      }
      // 由此可以看出for of是迭代完实例上的[Symbol.iterator]()
      for (const item of collection) {
        console.log(item)
      }
    },
    demo9() {
      const list = [0, 1, 2]
      console.log(list)

      // entries()迭代器
      console.log(list.entries())
      for (let entry of list.entries()) {
        // [key, value]
        console.log(entry)
      }

      // values()迭代器
      console.log(list.values())
      for (let value of list.values()) {
        // value
        console.log(value)
      }

      // keys()迭代器
      console.log(list.keys())
      for (let key of list.keys()) {
        // value
        console.log(key)
      }
    },
    demo10() {
      // 合并迭代器
      function *createNumberIterator() {
        yield 1
        yield 2
      }
      function *createStringIterator() {
        yield 'a'
        yield 'b'
      }
      function *createCombinedIterator() {
        yield * createNumberIterator()
        yield * createStringIterator()
      }

      const iterator = createCombinedIterator()

      for (const value of iterator) {
        console.log(value)
      }
    },
    demo11() {
      function *createStringIterator() {
        // 支持for...of消费的数据结构都行
        const data = [0, 1, 2]
        // yield * 快速创建迭代器
        yield * data
      }
      const iterator = createStringIterator()
      for (const value of iterator) {
        console.log(value)
      }
    },
    demo12() {
      // 给迭代器传参
      function *createIterator() {
        const first = yield 1;
        const second = yield first + 2
        yield second + 3
      }

      const iterator = createIterator()
      console.log(iterator.next())
      // 4作为第一个yield的返回值即first的值
      console.log(iterator.next(4))
      // 5作为第一个yield的返回值即second的值
      console.log(iterator.next(5))
      console.log(iterator.next())
    }
  },

}
</script>

<style>

</style>
