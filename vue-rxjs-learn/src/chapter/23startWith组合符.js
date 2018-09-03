// startWith只有实例操作符
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

// startWith的用法是Observable对象被订阅时先吐出startWith的参数
// startWith的参数可以无数个,当然你可以放在数组里,用...拆分
// startWith只能做同步的数据流需求
// 可以理解为最简单的数据流的concat

// const original$ = Observable.timer(0 ,1000);
// const result$ = original$.startWith(...['哈哈哈','啦啦啦']);
// result$.subscribe({
//     next(item) {
//         console.log(item);
//     }
// });

// 只所以有startWith是满足了链式调用的需求
// 至于endWith,直接用concat好了
const source$ = Observable.timer(1000 ,1000);
source$.map(x => x * 2).startWith('start').map(x => x+ ' ok').subscribe({
    next(item) {
        console.log(item);
    }
});

