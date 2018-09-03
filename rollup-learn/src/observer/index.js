import arrayMethods from './array.js';

console.log('observer.js');

var b = a => {
 return a * a;
};

export default {
    name: 'observer',
    arrayMethods: arrayMethods,
    b: b
}