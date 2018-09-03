import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';

// 上游Observable对象如果都依赖于另一个Observable对象,这就是多重依赖

// 以下上游Observable都依赖于original$
// 逻辑上source$1,source$2推送数据是同时的
// 但是js的单线程不可能做到同时这一点,所以总会有先后
// 所以会在一个很短的时间推送两个数据,和预期的结果不一样
// 避免这类问题,可以使用withLatesFrom组合符,
// 让一个上游控制推送数据的节奏,其他上游提供数据贡献

// const original$ = Observable.timer(0, 1000);

// const source1$ = original$.map(x => x + 'a');
// const source2$ = original$.map(x => x + 'b');

// const result$ = Observable.combineLatest(source1$, source2$);

// result$.subscribe({
//     next(item) {
//         console.log(item);
//     }
// });


const slow1$ = Observable.create((observer) => {
    setTimeout(() => {
        observer.next(1000);
    }, 1000);
    setTimeout(() => {
        observer.next(2000);
    }, 2000);
    setTimeout(() => {
        observer.next(3000);
    }, 3000);
    setTimeout(() => {
        observer.next(4000);
    }, 4000);
});

const slow2$ = Observable.create((observer) => {
    setTimeout(() => {
        observer.next(1000);
    }, 1000);
    setTimeout(() => {
        observer.next(2000);
    }, 2000);
    setTimeout(() => {
        observer.next(3000);
    }, 3000);
    setTimeout(() => {
        observer.next(4000);
    }, 4000);
});

Observable.combineLatest(slow1$, slow2$).subscribe({
    next(item) {
        console.log(item);
    }
});
