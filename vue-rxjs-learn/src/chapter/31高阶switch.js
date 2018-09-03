import {interval} from 'rxjs/observable/interval';
import {timer} from 'rxjs/observable/timer';
import {take, map, switchAll} from 'rxjs/operators';
import 'rxjs/add/operator/switch';
// 使用函数式引入操作符时,如果和保留字同名,加上_前缀
// import {_switch} from 'rxjs/operator/switch';
// 事实上switch就是switchAll
// console.log(_switch);

// switch的含义是"切换",
// 每当高阶Observable产生一个内部Observable
// switch产生的Observable都会订阅最新的Observable退订旧的

// switch产生的Observable完结基于2点同时成立:
// 1.高阶Observable完结
// 2.当前内部高阶完结(最后的内部高阶完结)

const ho$ = interval(1000).pipe(
    take(3),
    map(x => {
        return interval(700)
        .pipe(
            take(2),
            map(y => x + ':' + y),
        )
    })
);

const result$$ = ho$.pipe(switchAll());

result$$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

// 弹珠图代码要结合浏览器的最终结果一起分析:
// const { interval } = Rx;
// const { take, map} = RxOperators;

// interval(1000).pipe(
//   take(3),
//   map(x => {
//   	return interval(700)
//     .pipe(
//     	map(y => x + ':' + y),
//       take(2)
//     )
//   })
// );





