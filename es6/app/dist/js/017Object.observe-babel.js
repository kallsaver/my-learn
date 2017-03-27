'use strict';

var model = {};
Object.observe(model, function (change) {
  console.log(change);
});

model.name = 'a';