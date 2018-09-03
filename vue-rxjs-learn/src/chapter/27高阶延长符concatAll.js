import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';


const ho$ = Observable.interval(1000)
            .take(2)
            .map(x => {
                return Observable.interval(1500)
                .map(y => x + ':' + y)
                .take(2)
            });

// 使用了concatAll(),相当于触发了ho$的subscribe,
// 返回对内部的Observable的数据流映射新的一阶Observable
// concatAll的映射处理是:
// 第一个内部Observable对象完结后,才会去订阅下一个内部Observable的数据
const concated$ = ho$.concatAll();

concated$.subscribe({
    next(item) {
        console.log('concated$的subscribe:', item);
    }
});

// 弹珠图代码要结合浏览器的最终结果一起分析:
// const { interval } = Rx;
// const { take, map} = RxOperators;

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


