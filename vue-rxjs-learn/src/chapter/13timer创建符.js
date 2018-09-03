import {timer} from 'rxjs/observable/timer';
import {map} from 'rxjs/operators/map';

// 第一个参数是产生第一个数据的异步时间,
// 有第二个参数会产生持续的时间,没有第二个参数是一个有限数据流创建符
// 初始数据是0
// 可以认为interval是timer(x, x)的简写
const source1$ = timer(1000).pipe(
    map(x => x + 'A')
);

source1$.subscribe({
    next(item) {
        console.log(item)
    },
    complete() {
        console.log('complete')
    }
});


const source2$ = timer(2000, 1000);

source2$.subscribe({
    next(item) {
        console.log(item)
    }
});
