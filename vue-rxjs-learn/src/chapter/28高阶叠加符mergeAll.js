import {interval} from 'rxjs/observable/interval';
import {take, map, mergeAll} from 'rxjs/operators';

// mergeAll会订阅所有的内部Observable,并同时对他们的数据做映射

const ho$ = interval(1000)
            .pipe(
                take(2),
                map(x => {
                    return interval(1500)
                    .pipe(
                        map(y => x + ':' + y),
                        take(2)
                    )
                })
            );

const concated$ = ho$.pipe(mergeAll());

concated$.subscribe({
    next(item) {
        console.log(item);
    }
});

// 弹珠图代码要结合浏览器的最终结果一起分析:
const { interval } = Rx;
const { take, map } = RxOperators;

interval(1000).pipe(
  take(2),
  map(x => {
  	return interval(1500)
    .pipe(
    	map(y => x + ':' + y),
      take(2)
    )
  })
);




