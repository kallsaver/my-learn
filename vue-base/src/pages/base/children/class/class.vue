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
    this.demo6()
  },
  methods: {
    demo1() {
      class Man {
        constructor() {
          // console.log(sex)
        }
        // 类属性
        propsList = []
        getPropsList = () => {
          return this.propsList
        }
        // es7的静态属性
        static staticProps = 'static props'
        static staticFn() {
          console.log('static fn')
        }
        // 类成员
        memberFn() {
          console.log('member fn')
        }
      }
      // es6的静态属性
      Man.staticSex = 'static sex'
      const man = new Man()

      for (const key in man) {
        // 枚举了propsList,getPropsList, 没有枚举memberFn
        console.log('可枚举的key:', key)
      }
    },
    demo2() {
      function Woman() {}
      Woman.staticGrow = function () {
        console.log('Woman StaticGrow')
      }
      Woman.prototype.talk = function () {
        console.log('Woman talk')
      }
      const a = new Woman()
      for (const key in a) {
        console.log('可枚举的key:', key)
      }
    },
    // class继承
    demo3() {
      class Man {
        constructor(sex) {
          this.sex = sex
        }

        static grow() {
          console.log('grow')
        }

        talk() {
          console.log('talk')
        }

        printfSex() {
          console.log(`性别: ${this.sex}`)
        }
      }

      class Student extends Man {
        // 如果子类和父类的constructor参数一致,可以不用写constructor
        constructor(age, name, sex) {
          // super虽然在不同的地方指向不同,但是都很方便理解和使用
          super(sex)
        }

        static staticGrow() {
          console.log('staticGrow')
        }

        speak() {
          console.log('speak')
        }

        smile() {
          console.log('smile')
        }
      }

      const student = new Student(22, 'kallsave', '男')
      console.log(student)
    },
    // prototype继承
    demo4() {
      function Man(sex) {
        this.sex = sex
      }
      Man.prototype.printfSex = function () {
        console.log(`性别: ${this.sex}`)
      }
      Man.prototype.talk = function () {
        console.log('talk')
      }
      function Student(age, name, sex) {
        // 第一步: 在函数内部借用父类的constructor
        Man.prototype.constructor.call(this, sex)
      }
      // 第二步: 把原型链对象换成父类的原型链对象的克隆值
      Student.prototype = Object.create(Man.prototype)
      // 第三步: 把原型链对象的constructor改成函数名
      Student.prototype.constructor = Student
      const student = new Student(22, 'kallsave', '男')
      console.log(student)
    },
    demo5() {
      // getter, setter
      // class的getter,setter是挂载在构造层的
      // 而Object的getter,setter是挂载在私有层的

      class Man {
        constructor(sex, age) {
          this.sex = sex
          this._age = age
        }

        static grow() {
          console.log('grow')
        }

        talk() {
          console.log('talk')
        }

        printfSex() {
          console.log(`性别: ${this.sex}`)
        }

        get age() {
          return this._age + '岁'
        }

        set age(newVal) {
          this._age = newVal
        }
      }

      const man = new Man('男', 0)
      console.log(man)
      // 给私有层设值,但是也触发了挂载在钩子层的setter
      man.age = 100
      console.log(man.age)
    },
    demo6() {
      // 或者:
      function isEnumerable(isAble = true) {
        return function (target, name, descriptor) {
          descriptor.enumerable = isAble
          return descriptor
        }
      }

      // 内置了getter和setter
      class MyClass {
        // @isEnumerable(false)
        _number

        constructor(number) {
          this._number = number
        }

        get number() {
          console.log('getter')
          return this._number + 'px'
        }

        set number(value) {
          this._number = value
          console.log('setter value', value)
        }
      }

      const stance = new MyClass(1)
      stance.number = 2
      console.log(stance)
      for (const key in stance) {
        console.log('可枚举的key', key)
      }
    },
    demo7() {
      class Man {
        // 箭头函数的this指向申明时的父作用域,也就是永远是Man的实例
        // bind,call,apply都改变不了
        a = () => {
          console.log('a')
          console.log(this)
        }
        // this指向调用者
        b = function () {
          console.log('b')
          console.log(this)
        }
        // 等同于b
        c() {
          console.log('c')
          console.log(this)
        }
      }

      const man = new Man()
      man.a()
      man.b()
      man.c()

      const a = man.a
      const b = man.b
      const c = man.c

      a()
      b()
      c()
    },
    demo10() {
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
    demo12() {
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
  },
}
</script>

<style lang="stylus" scoped>

</style>
