
console.log('moduleA');

let def = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('打得动')
    },2000);
});

def.then(function(){
    console.log('then的回调函数执行')
});

export default 'moduleA';