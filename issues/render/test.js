// 斐波那契数列
function fibonacci(n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2)
}

// const div = document.getElementsByTagName('div')[0]

// background = getComputedStyle(div).background

// console.log(background)

console.log(fibonacci(36))
console.log(fibonacci(36))
console.log(fibonacci(36))
console.log(fibonacci(36))
console.log(fibonacci(36))
console.log(fibonacci(36))
console.log(fibonacci(36))
