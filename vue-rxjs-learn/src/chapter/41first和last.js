import {first, last} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {of} from 'rxjs/observable/of';

const source$ = of(3, 1, 5, 1, 5, 9);

// first操作符有多个参数,其中第二个参数是结果选择器
// first和last用法差不多,last要等待Observable完结触发推送

const first$ = source$.pipe(
  first(
    x => x % 2 === 0,
    // 结果选择器,是first的第二个回调函数
    (value, index) => [value, index],
    // 当Observable完结时依然没有找到符合的数据流,返回第三个参数作为默认值
    // 如果不设置默认值,没找到会触发error导致没法处理
    -1
  ),
);

first$.subscribe({
  next(item) {
    if (item === -1) {
      console.log('没有符合的数据流');
    } else {
      console.log(item);
    }
  },
  complete() {
    console.log('complete');
  }
});

const last$ = source$.pipe(
  last(
    x => x < 0,
    (value, index) => [value, index],
    -1
  ),
);

last$.subscribe({
  next(item) {
    if (item === -1) {
      console.log('没有符合的数据流');
    } else {
      console.log(item);
    }
  },
  complete() {
    console.log('complete');
  }
});
