// self或者this
this.addEventListener('message', function (event) {
  let data = event.data
  let count = data.count
  let city = data.city
  city.name = 'shenzhen'
  let ans = fibonacci(count)
  this.postMessage(ans)
} , false)

function fibonacci(n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}
