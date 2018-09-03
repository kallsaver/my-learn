console.log('array.js');

var arrayMethods = {
    name: 'array.js'
}

console.log('observer.js');

var b = a => {
 return a * a;
};

var observer = {
    name: 'observer',
    arrayMethods: arrayMethods,
    b: b
}

console.log('index.js');

var b$1 = a => {
  return a * a;
};

console.log(b$1(6));

var index = {
  observer: observer
}

export default index;
