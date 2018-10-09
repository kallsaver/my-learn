let proxyObject = {
  name: 'proxyObject'
}
// 当访问到proxyObject的属性才会触发
let proxy = new Proxy(proxyObject, {
  get(target, property) {
    // 被代理的对象
    console.log(target)
    // 访问的时候的proerty
    console.log(property)
    return 35 //target[property]
  }
})

let obj = Object.create(proxy)

// obj.age = 100
console.log(obj.age)


