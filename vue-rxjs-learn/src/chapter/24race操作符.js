// race有静态操作符也有实例操作符
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/race';
import 'rxjs/add/operator/map';

// 第一个吐出数据的Observable对象就是胜者
// race产生的Observable就会完全采用胜者的数据

const source1$ = Observable.timer(0, 2000).map(x => x + 'A');
const source2$ = Observable.timer(500, 1000).map(x => x + 'B');

const winner$ = Observable.race(source1$, source2$);

winner$.subscribe({
    next(item) {
        console.log(item);
    }
});
