// ts只通过泛型函数的参数推导泛型的类型
// 所以T默认为{}
const promise = new Promise<number>((resolve) => {
  resolve(45)
})

promise.then((result) => {
  console.log(result * 4)
})
