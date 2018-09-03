// concat既有实例操作符,也有静态操作符
// 组合符也是创建符的一种
import 'rxjs/add/operator/concat';
//import {concat} from 'rxjs/observable/concat';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// 使用concat的时候要注意上游的数据如果是有限的,下游才有开始
// 然后下游的数据开始推送,否则下游永远也没有上场的机会
// concat是有按顺序的,用于队列控制
// 如果从弹珠图来看,concat是延长几条弹珠时间线
// 最后的上游数据complete,下游才会complete

// const source1$ = Observable.create((observer) => {
//     observer.next(1);
// });

// const source1$ = of(1, 2, 3);
// const source2$ = of(4, 5, 6);

// const concated$ = source1$.concat(source2$);

// concated$.subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
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
        observer.complete();
    }, 4000);

}).map(x => x + 'A');


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
        observer.complete();
    }, 4000);
}).map(x => x + 'B');

const slow3$ = Observable.create((observer) => {
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
        observer.complete();
    }, 5000);

}).map(x => x + 'C');

const result$ = slow1$.concat(slow2$, slow3$);

result$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});


