// 高阶Observable指的是一个Observable对象的数据流是Observable对象
// 一阶Observable管理的数据流是普通的数据结构,
// 高阶Observable管理的是Observable对象

// 高阶Observable产生的数据,称为内部Observable,因为它们不展示在外
// 内部Observable是独立的Observable,它们有自己的生命周期
// 高阶操作符concatAll等都是对内部Observable的数据流做出映射处理

// 总体来说,高阶符是不带参数的
// 用高阶符操作高阶Observable的弹珠图是一条高阶Observable对象的时间轴线,
// 里面的数据流是的内部Observable
// 而内部Observable也有各自的时间轴线
// 而高阶操作符产生的弹珠图是把所有的内部Observable的数据流放在最终的时间轴线上


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';


const ho$ = Observable.interval(1000)
            .take(2)
            .map(x => {
                return Observable.interval(1000)
                .map(y => x + ':' + y)
                .take(2)
                .subscribe({
                    next(item) {
                        console.log('内部Observable的subscribe:' + item);
                    }
                });
            });

ho$.subscribe({
    next(item) {
        console.log('高阶Observable的subscribe:' + item);
    }
});


// 弹珠图代码:
// const { interval } = Rx;
// const { take, map } = RxOperators;

// interval(1000).pipe(
//   take(2),
//   map(x => {
//   	return interval(1200)
//     .pipe(
//     	map(y => x + ':' + y),
//       take(2)
//     )
//   })
// );

