import {takeWhile, filter, take} from 'rxjs/operators';
import {range} from 'rxjs/observable/range';
import {interval} from 'rxjs/observable/interval';

// takeWhile的回调函数是判定函数
// takeWhild会遍历上游数据流,回调函数返回false,takeWhild完结

// const range$ = range(1, 20);

// const takeWhile$ = range$.pipe(
//   takeWhile(
//     (value, index) => index < 4
//   )
// );

// takeWhile$.subscribe({
//   next(item) {
//     if (item === -1) {
//       console.log('没有符合的数据流');
//     } else {
//       console.log(item);
//     }
//   },
//   complete() {
//     console.log('complete');
//   }
// });

// takeWhild其实不好用
// 过滤符合条件的第N个数据这种需求才好用
// filter和take组合创造一个新的操作符可以满足

// pipe也就是letable操作符的作用是把调用者作为参数传给pipe的回调函数的第一个参数
// 下面代码中filter不是pipe的回调函数,filter的返回值才是pipe的回调函数
// 参照07let操作符
const takeCountWhild = function (callback, count) {
  return function (obs$) {
    return obs$.pipe(
      filter(callback),
      take(count),
    );
  };
};

const source$ = interval(1000);

const even2$ = source$.pipe(
  takeCountWhild(
    value => value % 2 === 0,
    4
  )
);

even2$.subscribe({
  next(item) {
    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});

