<template>
  <page
    :title="$route.meta.title">
    <div class="class">
    </div>
  </page>
</template>

<script>
import { deepClone } from '@/common/helpers/utils'

export default {
  mounted() {
    this.demo2()
  },
  methods: {
    demo1() {
      class Person {
        constructor(firstname, lastname) {
          this._firstname = firstname
          this._lastname = lastname
        }

        a = 1

        get firstname() {
          console.log('getter')
          return this._firstname
        }

        set firstname(firstname) {
          console.log('setter')
          this._firstname = firstname
        }
      }

      const person = new Person('Turm', 'Sam')
      // class上的getter无法被Object.keys遍历,因为不是自身的属性,是在原型链的构造层上
      // Object.defineProperty定义的属性是在自身,而class和obj的getter是在原型链上
      console.log(Object.keys(person))
      console.log(person)
      person.firstname = 'x'
      console.log(person.firstname)
      console.log('a', person.a)
      const personCreate = Object.create(person)
      console.log(personCreate)

      const obj = {
        _firstname: 'JSON',
        get firstname() {
          console.log('getter')
          return this._firstname
        },
        set firstname(firstname) {
          console.log('setter')
          this._firstname = firstname
        }
      }

      console.log(obj.firstname)
      // 对象上的getter可以被Object.keys遍历,是自身的属性
      console.log(Object.keys(obj))
      console.log(obj)
      obj._firstname = 'x'
      console.log(obj.firstname)

      const objClone = deepClone(obj)
      objClone.firstname = 'gg'
      console.log(objClone.firstname)

      const objCreate = Object.create(obj)
      console.log(objCreate)
    },
    demo2() {
      function isObject(value) {
        return value && typeof value === 'object'
      }

      // 递归冻结
      function deepFreeze(value) {
        if (isObject(value)) {
          // Object.keys无法冻结原型链上的,for in可以
          Object.keys(value).forEach((key) => {
            console.log('key', key)
            deepFreeze(value[key])
          })
          // for (const key in value) {
          //   console.log(key)
          //   deepFreeze(value[key])
          // }
          if (!Object.isFrozen(value)) {
            Object.freeze(value)
          }
        }
      }

      // Object.freeze
      class Person {
        constructor(firstname, lastname, address) {
          this._firstname = firstname
          this._lastname = lastname
          this._address = address
        }

        get firstname() {
          console.log('getter')
          return this._firstname
        }

        set firstname(firstname) {
          console.log('setter')
          this._firstname = firstname
        }

        get address() {
          return this._address
        }

        set address(address) {
          this._address = address
        }
      }

      const person = new Person('Turm', 'Sam', {})
      // 对象的属性不被允许修改(包括继承来的属性)
      // 浅冻结
      Object.freeze(person)
      // 已经被冻结
      // console.log(Object.isFrozen(person))
      console.log(person.firstname)
      console.log(Object.keys(person))
      // person.firstname = 'x'
      // 嵌套的对象的属性不会被冻结
      person.address.city = 'sg'
      deepFreeze(person)
      console.log(person)
      // person.address.city = 'sg'

      const list = [1, 2, 3]
      Object.freeze(list)
      // 数组一样适用
      // list[0] = 1

      function run() {

      }
      run.test = 'x'
      Object.freeze(run)
      // 函数一样适用
      // run.test = 'g'
    },
    deomo3() {

    }
  },
}
</script>

<style>

</style>
