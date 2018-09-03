import {interval} from 'rxjs/observable/interval';
import {never} from 'rxjs/observable/never';
import {take, map, concat, combineAll} from 'rxjs/operators';

// combineAll其实是combineLatestAll

const ho$ = interval(1000).pipe(
  take(2),
  // 类似zipAll配对符都是要求高阶Observable是个完结的Observable
  //concat(never()),
  map(x => {
    return interval(1500)
    .pipe(
      take(2),
      map(y => x + ':' + y),
    )
  })
);

let a = false;
console.time('a');
const zipAlled$ = ho$.pipe(combineAll());

zipAlled$.subscribe({
  next(item) {
    if(a === false) {
      // 2s确定有多少个分支(最后一个分支产生)
      // 还有1.5s是最后一个分支开始产生数据的时间
      // 从订阅到产生第一个数据,要花费3.5s
      console.timeEnd('a');
    }
    a = true;
    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});
