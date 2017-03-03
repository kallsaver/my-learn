'use strict';

function breakfast(dessert, drink) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      location = _ref.location,
      name = _ref.name;

  console.log(dessert, drink, location, name);
}

breakfast('蛋糕', '果汁', { location: '深圳', name: 'kallsave' });