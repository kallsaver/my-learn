// withLatestFrom只有实例操作符
import {Observable} from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

// 调用OwidthLatestFrom的Observable有主导数据流节奏的作用
// 作为参数的Observable这是贡献数据

// const source1$ = Observable.create((observer) => {
//     setTimeout(() => {
//         observer.next(2000);
//     }, 2000);
//     setTimeout(() => {
//         observer.next(4000);
//     }, 4000);
//     setTimeout(() => {
//         observer.next(6000);
//     }, 6000);
//     setTimeout(() => {
//         observer.next(8000);
//     }, 8000);
//     setTimeout(() => {
//         observer.complete();
//     }, 10000);
// });

// const source2$ = timer(500, 1000);
// const result$ = source1$.withLatestFrom(source2$).map(arr => arr[0] + arr[1]).subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });


// const source1$ = timer(0, 2000).map(x => 2000 * x);
// const source2$ = timer(500, 1000);
// const result$ = source1$.withLatestFrom(source2$).map(arr => arr[0] + arr[1]).subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });

// withLatestFrom解决逻辑时间相同的问题
// 至于withLatestFrom如何做到逻辑时间相同,程序时间也相同就暂时不知道了
const original$ = timer(0, 1000);

const source1$ = original$.map(x => x + 'a');
const source2$ = original$.map(x => x + 'b');

const result$ = source1$.withLatestFrom(source2$);

result$.subscribe({
    next(item) {
        console.log(item);
    }
});


