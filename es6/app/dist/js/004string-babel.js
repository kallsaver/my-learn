'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['\u4ECA\u5929\u7684\u65E9\u9910\u662F\n  ', '\u548C', '?'], ['\u4ECA\u5929\u7684\u65E9\u9910\u662F\n  ', '\u548C', '?']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var dessert = '蛋糕',
    drink = '奶茶';

var breakfast = '今天的早餐是' + dessert + '和' + drink + '!';

console.log(breakfast);

//``定义的字符串可以随意的回车换行,是模板字符串,用于字符画很方便
var breakfast2 = '\u4ECA\u5929\u7684\u65E9\u9910\u662F\n  ' + dessert + '\u548C' + drink + '?';

console.log(breakfast2);

var a = 'dd';

console.log(typeof a === 'undefined' ? 'undefined' : _typeof(a));

var breakfast3 = kitchen(_templateObject, dessert, drink);

function kitchen(strings) {
  console.log(strings);

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  console.log(values);
}