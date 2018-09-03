import {interval} from 'rxjs/observable/interval';
import {never} from 'rxjs/observable/never';
import {take, map, zipAll, concat} from 'rxjs/operators';

const ho$ = interval(1000).pipe(
    take(2),
    // 因为zipAll是对内部Obervable轴线的数据流进行配对(多个)
    // 即高阶Obervabl有多少个数据流,就几个分支配一起
    // 也就是说如果高阶Obervable不完结,zipAll是不知道到底要几个分支配一起
    // 类似zipAll配对符都是要求高阶Observable是个完结的Observable
    // 这也说明了zipAll的时间机制相当于Promise.all
    //concat(never()),
    map(x => {
        return interval(1500)
        .pipe(
            take(2),
            map(y => x + ':' + y),
        )
    })
);

let a = false;
console.time('a');
const zipAlled$ = ho$.pipe(zipAll());

zipAlled$.subscribe({
    next(item) {
        if(a === false) {
            // 2s确定有多少个分支(最后一个分支产生)
            // 还有1.5s是最后一个分支开始产生数据的时间
            // 从订阅到产生第一个数据,要花费3.5s
            console.timeEnd('a');
        }
        a = true;
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

// 弹珠图
// 弹珠图代码要结合浏览器的最终结果一起分析:
// const { interval } = Rx;
// const { take, map } = RxOperators;

// interval(1000).pipe(
//   take(2),
//   map(x => {
//   	return interval(1500)
//     .pipe(
//     	map(y => x + ':' + y),
//       take(2)
//     )
//   })
// );



