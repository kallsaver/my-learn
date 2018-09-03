import {every} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const source$ = of(3, 1, 4, 1, 5);
// 当所有的数据流都满足every的回调,返回true
// 当其中一个数据流不满足,返回false
const every$ = source$.pipe(
  every(x => x > 0)
);

every$.subscribe({
  next(item) {
    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});
