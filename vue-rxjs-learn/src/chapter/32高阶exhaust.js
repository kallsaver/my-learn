import {interval} from 'rxjs/observable/interval';
import {take, map, exhaust} from 'rxjs/operators';

// exhaust是耗尽的意思
// 当订阅了一个内部Observable,
// 在没有耗尽这个Observable的数据就不会订阅新的Observable
// 当耗尽了当前Observable的数据,总是会有等待新的Observable的时刻
// 中间产生的Observable被抛弃

// switch产生的Observable完结基于2点同时成立:
// 1.高阶Observable完结
// 2.当前内部高阶完结

const ho$ = interval(1000).pipe(
    take(3),
    map(x => {
        return interval(700)
        .pipe(
            take(2),
            map(y => x + ':' + y),
        )
    })
);

const result$$ = ho$.pipe(exhaust());

result$$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

// 弹珠图代码要结合浏览器的最终结果一起分析:
// const { interval } = Rx;
// const { take, map} = RxOperators;

// interval(1000).pipe(
//   take(3),
//   map(x => {
//   	return interval(700)
//     .pipe(
//     	map(y => x + ':' + y),
//       take(2)
//     )
//   })
// );
