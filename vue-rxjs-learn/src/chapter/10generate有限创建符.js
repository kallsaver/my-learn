import  {generate} from 'rxjs/observable/generate';

// const source$ = generate(
//     // for循环中的i = 2
//     2,
//     // for循环中的 i < 10
//     i => i < 10,
//     // for循环中的递增
//     i => i + 1,
//     // for循环中的函数
//     i => i * i
// );

// generate不限于产生数值类型的数据流
const source$ = generate(
    // for循环中的i = 2
    'x',
    // for循环中的 i < 10
    i => i.length < 5,
    // for循环中的递增
    i => i + 'y',
    // for循环中的函数
    i => i
);

source$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});
