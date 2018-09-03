import {of} from 'rxjs/observable/of';
import {timer} from 'rxjs/observable/timer';
import {concat, count} from 'rxjs/operators';

// count是统计有限数据流的Observable的数据个数
// 在完结时触发

const source$ = of(1, 2, 3).pipe(
    concat(
        of(4, 5, 6)
    )
);

const count$ = source$.pipe(count());

count$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

const timer$ = timer(1000).pipe(
    concat(timer(2000))
);

const timerCount$ = timer$.pipe(count());

timerCount$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

