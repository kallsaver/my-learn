<template>
  <page
    :title="$route.meta.title">
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo6()
  },
  methods: {
    demo1() {
      function dec(target, name, descriptor) {
        target.isShage = true
        return target
      }

      // 给类装饰,装饰到类的静态上
      @dec
      class Shape {
        constructor(size) {
          this.size = size
        }
      }

      const shape = new Shape(1)
      console.log(Shape.isShage)
    },
    demo2() {
      function dec(target, name, descriptor) {
        console.log('decorator')
        // this
        console.log('target', target)
        // key
        console.log('name', name)
        // descriptor
        console.log('descriptor', descriptor)
        target.isShage = true
        return target
      }

      class Shape {
        constructor(size) {
          this.size = size
        }

        // 给类属性装饰,装饰到实例上
        @dec
        getSize() {
          console.log('origin')
          return this.size
        }
      }

      const shape = new Shape(1)
      console.log(shape.getSize())
    },
    demo3() {
      function dec(target, name, descriptor) {
        Object.defineProperty(target.prototype, 'isShape', {
          writable: false,
          enumerable: true,
          value: true
        })
      }

      // 通过prototype装饰到实例上
      @dec
      class Shape {
        constructor(size) {
          this.size = size
        }
      }

      const shape = new Shape(1)
      /* eslint-disable */
      console.log(shape)
      console.log(shape.isShage)
    },
    demo4() {
      // 不可枚举
      function inenumerable(target, name, descriptor) {
        descriptor.enumerable = false
        return descriptor
      }

      // 可枚举
      function enumerable(target, name, descriptor) {
        descriptor.enumerable = true
        return descriptor
      }

      // 或者:
      function isEnumerable(isAble = true) {
        return function (target, name, descriptor) {
          descriptor.enumerable = isAble
          return descriptor
        }
      }

      // 不可读
      function readonly(target, name, descriptor) {
        descriptor.writable = false
        return descriptor
      }

      class Stack {
        constructor() {

        }

        @readonly
        store = []

        add(item) {
          this.store.push(item)
        }

        get size() {
          return this.store.length
        }

        @isEnumerable(true)
        getStore() {
          return this.store
        }
      }

      const stack = new Stack()
      stack.add(1)
      console.log(stack)
      for (const key in stack) {
        // 注意: 类属性默认不可枚举,而类变量默认可以枚举
        console.log('key', key)
      }

      // 报错
      // stack.store = []
    },
    demo5() {
      function proxy(target, name, descriptor) {
        descriptor.enumerable = true
        return descriptor
      }

      class stack {
        constructor() {

        }

        store = []

        @proxy
        getSize() {
          return this.store.length
        }
      }
    },
    demo6() {
      const proxyHooks = ['onShow']

      function mixins(...args) {
        return (target, name) => {
          console.log(EventTarget)
          for (const mixin of args) {
            for (const key in mixin) {
              if (proxyHooks.indexOf(key) > -1) {
                const originHook = target[key]
                target.prototype[key] = function () {
                  console.log('track')
                  originHook && originHook.call(this, arguments)
                }
              } else {
                Object.assign(target.prototype, mixins)
              }
            }
          }
        }
      }

      const track = {
        onShow() {
          console.log('track onShow')
        }
      }

      @mixins(track)
      class Page {
        onShow() {
          console.log('track onShow2')
        }
      }

      const originPage = Page

      // const page = new Page()
      // page.onShow()
    }
  },
}
</script>

<style>

</style>
