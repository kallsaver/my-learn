'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chef = function () {
  //这个类的constructor是food;
  function Chef(food) {
    _classCallCheck(this, Chef);

    //这里面的属性是写在实例成
    this.food = food;
  }
  //不需要,分隔开
  //这里的数据写在Chef实例的下一层,也就是上层Object


  _createClass(Chef, [{
    key: 'cook',
    value: function cook() {
      console.log(this.food);
    }
  }, {
    key: 'speak',
    value: function speak() {
      console.log('啊啊啊');
    }
  }, {
    key: 'breakfast',
    value: function breakfast(food) {
      this.foods = food;
    }
  }]);

  return Chef;
}();

var a = new Chef('烧鸭');

console.log(a);

//和ES5一样  实例的下一层的constructor就是这个构造函数
console.log(Chef.prototype.constructor === Chef); //true