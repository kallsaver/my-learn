// self或者this
this.onmessage = function (event) {
  var data = event.data;
  var count = data[1];
  var ans = fibonacci(count);
  this.postMessage(ans);
}

function fibonacci(n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}
