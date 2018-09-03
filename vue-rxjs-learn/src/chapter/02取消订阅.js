import { Observable } from 'rxjs/Observable';


// Rx.js中的Observable其实是一个对无穷数据的迭代方案
// 假如我们不中断这个程序,让它一直运行下去,
// 这个程序也不会消耗更多的内存,
// 这是因为Observable对象每次只吐出一个数据,
// 然后这个数据被Observer消耗处理了,不会存在数据的堆积
// 这种操作方式,和把所有的数据堆积到一个数组中,然后挨个处理不一样
// 如果使用数组,内存的消耗就随着数组大小改变
// 退订可以通过可订阅者complete触发,也可以由观察者触发unsubscribe完成
const onSubscribe = observer => {
  let number = 1;

  const hander = setInterval(() => {
    observer.next(number++);
    // if (number > 3) {
    //   clearInterval(hander);
    //   observer.complete();
    // }
  }, 1000);

  return {
    unsubscribe() {
      console.log('unsubscribe');
      // clearInterval(hander);
    }
  };
};


const source$ = new Observable(onSubscribe);

// subscribe可以不接受对象,而是通过参数位接受一个个处理函数
const subscriber = source$.subscribe({
  next(item) {
    console.log(item);
  },
  complete() {
    console.log('c推送数据完毕');
  }
});

console.log(source$);

console.log(subscriber);

setTimeout(() => {
  subscriber.unsubscribe();
}, 3500);


