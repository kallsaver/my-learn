import observer from './observer/index.js';

console.log('index.js');

const a = 1;

var b = a => {
  return a * a;
}

console.log(b(6));

export default {
  observer: observer
}