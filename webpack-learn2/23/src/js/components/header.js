var arr = [1, 2, 3, 4];

let arrB = arr.map(item => item * 2);

console.log('new Set(arrB)', new Set(arrB));

var def = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('打得动')
    }, 2000);
});

def.then(function () {
    console.log()
});

export default {
    name: 'header'
}