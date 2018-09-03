import {debounceTime} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {Observable} from 'rxjs/Observable';

// debounceTime的作用是过滤点出现间隙密集分布的数据流,推送间隙疏松分布的数据,去抖动
// 从产生新的数据开始用debounceTime的参数计时
// 这段时间如果产生新的数据,重新开始计时
// 这段时间如果不产生新的数据,就在计时结束时把数据推送给下游,
// 然后等待下一个数据,然后重复以上流程
// 如果在debounceTime计时阶段有complete,触发完结

let a = false;

const much$ = Observable.create(observer => {
  // 开始计时
  observer.next(0);
  // 重新计时
  setTimeout(() => {
    observer.next(900);
  }, 900);
  // 重新计时
  setTimeout(() => {
    observer.next(1200);
  }, 1200);
  // 重新计时
  setTimeout(() => {
    observer.next(1500);
    // observer.complete();
  }, 1500);
  // 重新计时
  setTimeout(() => {
    observer.next(2000);
    // observer.complete();
  }, 2000);

  // 第3s过去了,没有新数据,开始推送上面保留的最新数据

  setTimeout(() => {
    observer.next(4000);
  }, 4000);

  setTimeout(() => {
    observer.next(5100);
  }, 5100);

  setTimeout(() => {
    observer.next(5700);
  }, 5700);
});

console.time('first');

much$.pipe(
  debounceTime(1000)
).subscribe({
  next(item) {
    if (a === false) {
      a = true;
      console.timeEnd('first');
    }

    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});
