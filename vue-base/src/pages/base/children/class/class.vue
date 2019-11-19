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
    // this.demo1()
    // this.demo2()
    this.demo3()
    this.demo4()
    // this.demo5()
  },
  methods: {
    // class和prototype比较
    demo1() {
      class Man {
        constructor() {
          // console.log(sex)
        }
        // es7的静态属性
        static target = 'target'
        static staticGrow() {
          console.log('Man staticGrow')
        }
        talk() {
          console.log('Man talk')
        }
      }
      // es6的静态属性
      Man.sex = 'man'

      let a = new Man()
      // a.talk()
      // a.constructor === Man.prototype.constructor
      // class类的内部所有定义的方法，都是不可枚举的
      for (let i in a) {
        console.log('Man key', i)
      }
      // 静态方法
      Man.staticGrow()
      // 静态属性
      console.log(Man.target)
      console.log(Man.sex)
    },
    // class和prototype比较
    demo2() {
      function Woman() {}
      Woman.StaticGrow = function () {
        console.log('Woman StaticGrow')
      }
      // 所有实例
      Woman.prototype.talk = function () {
        console.log('Woman talk')
      }
      let a = new Woman()
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
        console.log('Woman key', i)
      }
      Woman.StaticGrow()
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
        // 如果子类和父类的constructor参数一致,可以不用写
        constructor(age, name, sex) {
          // super的含义很复杂
          // 作为函数用相当于Man.prototype.constructor.call(this, arguments)?
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
    // prototype继承
    demo4() {
      function Man(sex) {
        this.sex = sex
      }
      Man.prototype.talk = function () {
        console.log('talk')
      }
      Man.prototype.printfSex = function () {
        console.log(`性别: ${this.sex}`)
      }
      function Student(age, name, sex) {
        Man.prototype.constructor.call(this, sex)
      }
      // 有通用改变原型链来继承和原型挂载共享方法是注意继承要写在前面
      Student.prototype = new Man()
      Student.prototype.constructor = Student
      Student.prototype.speak = function () {}
      let a = new Student(22, 'kallsave', '男')
      // a.talk()
      // a.speak()
      console.log(a)
    },
    demo5() {
    },
    demo6() {
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
    demo7() {
      // 内置了getter和setter
      class MyClass {
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

      let inst = new MyClass(1)
      inst.number = 2

      console.log('inst.number', inst.number)
    },
    demo8() {
      // es5
      function Student() {}

      function Teacher() {
        Teacher.prototype.type = 'Teacher'
        Teacher.prototype.constructor = Teacher
      }

      function Man() {}
      // Student.prototype.type这种写在外部,无法保证后面会被prototype的引用地址被冲掉
      // Student.prototype.type = 'student'
      Student.prototype = new Man()
      Teacher.prototype = new Man()

      let student = new Student()
      let teacher = new Teacher()
      console.log(student)
      console.log(teacher)

      // es6
      class Worker {
        constructor() {

        }
      }

      Worker.prototype = new Man()

      let worker = new Worker()
      console.log(worker)
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
