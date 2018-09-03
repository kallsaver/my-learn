import {filter, isEmpty} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {of} from 'rxjs/observable/of';

// 如果没有符合条件的,就会产生一个空的Observable
const result$ = of(3, 1, 5, 1, 5, 9).pipe(
    filter(x => x % 2 === 0)
);

result$.subscribe({
    next(item) {
        console.log('result$', item);
    },
    complete() {
        console.log('complete');
    }
});

const isEmpty$ = result$.pipe(
    isEmpty()
);

isEmpty$.subscribe({
    next(item) {
        console.log('isEmpty$', item);
    },
    complete() {
        console.log('complete');
    }
});


// const even$ = interval(1000).pipe(
//     filter(x => x % 2 === 0)
// );

// even$.subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });
