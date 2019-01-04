<template>
  <page
    :title="$route.meta.title">
    <div class="class">
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    // 不同点:
    // class内部的属性是不可枚举的,通过prototype添加的属性是可以枚举的
    // this.demo1()
    // this.demo2()
    // this.demo3()
    this.demo4()
  },
  methods: {
    // class和prototype比较
    demo1() {
      class Man {
        constructor(sex) {
          // console.log(sex)
        }
        static grow() {
          console.log('grow')
        }
        talk() {
          console.log('talk')
        }
      }

      let a = new Man('男')
      // a.talk()
      // a.constructor === Man.prototype.constructor
      // class类的内部所有定义的方法，都是不可枚举的
      for (let i in a) {
        console.log(i)
      }
      // 静态方法
      Man.grow()
    },
    // class和prototype比较
    demo2() {
      function Man(sex) {
        // console.log(sex)
      }
      Man.grow = function () {
        console.log('grow')
      }
      // 所有实例
      Man.prototype.talk = function () {
        console.log('talk')
      }
      let a = new Man('男')
      // a.talk()
      /* eslint no-proto: "off" */
      // console.log(Man.prototype === a.__proto__)
      // getPrototypeOf(a)等同于a.__proto__
      // console.log(Man.prototype === Object.getPrototypeOf(a))
      // console.log(a)
      // constructor就是构造函数
      // console.log(a.constructor === Man.prototype.constructor === Man)
      // prototype加的方法是可以枚举的
      for (let i in a) {
        console.log(i)
      }
      Man.grow()
    },
    demo3() {
      // 继承
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
        constructor(age, name, sex) {
          // super的含义很复杂
          // 作为函数用相当于Man.prototype.constructor.call(this)
          // 并且做函数用只能写在子类的constructor中
          super(sex)
          console.log('super.valueOf()', super.valueOf())
          // 作为对象用相当于this.printfSex()
          // super.printfSex()
        }

        static study() {
          console.log('study')
          // super在静态方法拿到的是父类构造函数
          console.log('super.valueOf()', super.valueOf())
          super.grow()
        }

        speak() {
          console.log('speak')
          // super在动态方法拿到的是实例
          super.talk()
        }
      }

      let a = new Student(22, 'kallsave', '男')
      a.talk()
      a.speak()
      Student.study()
      console.log(a)
    },
    demo4() {
      // getter, setter
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
          console.log(`setter ${newVal}`)
          this._age = newVal
        }
      }

      let a = new Man('男', 0)
      console.log(a.age)
      a.age = 100
      console.log(a.age)
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>
