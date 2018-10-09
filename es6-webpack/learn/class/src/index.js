class Man {
  constructor(sex) {
    this.sex = sex
  }

  talk() {
    console.log('a man')
  }

  printfSex() {
    console.log(`性别: ${this.sex}`)
  }
}



class Student extends Man {
  constructor(age, name, sex) {
    // 调用父类的construtor
    super(sex)
    this.age = age
    this.name = name
  }

  speak() {
    console.log(`a student named: ${this.name}`)
  }
}

let p = new Student(10, 'mike', '男')

p.speak()

p.printfSex()
