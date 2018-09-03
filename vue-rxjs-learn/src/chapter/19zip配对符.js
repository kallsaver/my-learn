import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';

// zipped产生的数据流必须是一对或者说是一列的
// 任何一个上游Observable完结,zip会等待完结之前的数据流配对好,
// 然后就会给下游complete信号
// 如果从弹珠图看,zip是几条弹珠时间轴线上的珠按顺序配对

// const source1$ = Observable.of(1, 2, 3, 4);
// const source2$ = Observable.of('a', 'b', 'c');

// const zipped$ = Observable.zip(source1$, source2$);

// zipped$.subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });

// 数据积压的问题
// 如果一个上游Observable产生数据很快,另一个很慢
// zip就要先存储产生快的数据

const fast$ = Observable.create((observer) => {
    setTimeout(() => {
        observer.next(1)
    }, 100);
    setTimeout(() => {
        observer.next(2)
    }, 200);
    setTimeout(() => {
        observer.next(3)
    }, 300);
    setTimeout(() => {
        observer.complete();
    }, 400);
});

const slow$ = Observable.create((observer) => {
    setTimeout(() => {
        observer.next(1)
    }, 1000);
    setTimeout(() => {
        observer.next(2)
    }, 2000);
    setTimeout(() => {
        observer.next(3)
    }, 3000);
    setTimeout(() => {
        observer.complete();
    }, 4000);
});

Observable.zip(fast$, slow$).subscribe({
    next(item) {
        console.log(item)
    },
    complete() {
        console.log('complete');
    }
})


