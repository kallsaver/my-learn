import {find, findIndex} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const source$ = of(3, 1, 5, 1, 5, 9);

// find找到第一个符合回调函数的数据流就会返回这个元素
// 如果完结依然没找到返回undefined
// findIndex则是返回元素的索引
// 如果完结依然没找到返回-1

const find$ = source$.pipe(
     find(x => x % 2 === 0),
    //findIndex(x => x % 2 === 0),
);

find$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});
