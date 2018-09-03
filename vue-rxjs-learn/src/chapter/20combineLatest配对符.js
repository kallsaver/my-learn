import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

// combineLatest和zip等都是配对组数据流
// 不同的是combineLatest第一次就等待最慢的那个上游数据
// 之后向下推送的机制是谁触发就开始推送,然后配对如果不是同一时间触发就保持上次的结果
// 上游数据流都完结下游才会完结,只要有一个上游不完结,下游都会继续被推送
const fast$ = Observable.create((observer) => {
    setTimeout(() => {
        observer.next(500);
    }, 500);
    setTimeout(() => {
        observer.next(1500);
    }, 1500);
    setTimeout(() => {
        observer.next(2000);
    }, 2000);
    setTimeout(() => {
        observer.complete();
    }, 2500);
});

const slow$ = Observable.create((observer) => {
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
    setTimeout(() => {
        observer.next(5000);
    }, 5000);
    setTimeout(() => {
        observer.next(6000);
    }, 6000);
});

Observable.combineLatest(fast$, slow$).subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

// 如果希望得到的不是数组,可以用map操作符处理
// Observable.combineLatest(fast$, slow$).map(arr => {
//     return arr[0] + arr[1];
// }).subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });

//
