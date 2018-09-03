import {throttleTime} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {Observable} from 'rxjs/Observable';

// throttleTime的作用是保证一段时间间隔只会产生一个数据给下游,节流
// 从产生新的数据开始用throttleTime的参数计时
// 这段时间产生的数据无效,过了计时后,等待下一个数据,然后重复以上流程
// 如果在throttleTime计时阶段有complete,触发完结

// const source$ = interval(1000);
// const result$ = source$.pipe(
//     throttleTime(2500)
// );

// result$.subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });

const much$ = Observable.create(observer => {
  setTimeout(() => {
    observer.next(1000);
  }, 1000);

  // 被抛弃
  setTimeout(() => {
    observer.next(1500);
    // observer.complete();
  }, 1500);

  setTimeout(() => {
    observer.next(4000);
  }, 4000);

  setTimeout(() => {
    observer.next(5100);
  }, 5100);

  // 被抛弃
  setTimeout(() => {
    observer.next(5700);
  }, 5700);
});


much$.pipe(
  throttleTime(1000)
).subscribe({
  next(item) {
    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});


