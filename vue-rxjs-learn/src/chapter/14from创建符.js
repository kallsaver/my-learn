import {from} from 'rxjs/observable/from';

// 转数字和类数字和字符串
const source$ = from([1, 2, 3]);

source$.subscribe({
    next(item) {
        console.log(item);
    }
});

// 转Iterable类型数据结构
function * generateNumber(max){
    for(let i = 1; i < max; i++){
        yield i;
    }
}

const source1$ = from(generateNumber(3));

source1$.subscribe({
    next(item) {
        console.log(item);
    }
});

// 转Promise
// 如果是成功的Promise,自然就complete
// 如果是失败的Promise,自然就error
//const promise = Promise.resolve('good');
const promise = Promise.reject('bad');
const source2$ = from(promise);

source2$.subscribe({
    next(resolve) {
        console.log(resolve);
    },
    error(reject) {
        console.log(reject);
    },
    complete() {
        console.log('complete');
    }
})
