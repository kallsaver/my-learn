'use strict';

class Chef{
  //这个类的constructor是food;
  constructor(food){
    //这里面的属性是写在实例成
    this.food = food;
  }
  //不需要,分隔开
  //这里的数据写在Chef实例的下一层,也就是上层Object
  cook(){
    console.log(this.food);
  }
  speak(){
    console.log('啊啊啊')
  }

  breakfast(food){
    this.foods = food
  }

}

let a = new Chef('烧鸭');

console.log(a)

//和ES5一样  实例的下一层的constructor就是这个构造函数
console.log(Chef.prototype.constructor === Chef)  //true
