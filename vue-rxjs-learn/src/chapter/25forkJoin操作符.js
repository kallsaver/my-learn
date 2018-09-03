// forkJoin只有静态操作符,没有实例操作符形式
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

const source1$ = Observable.interval(1000).map(x => x + 'a').take(1);
const source2$ = Observable.interval(1000).map(x => x + 'b').take(3);

const concated$ = Observable.forkJoin(source1$, source2$);

// forkJoin会等待上游所有Observable完结,选择最后的一对数据合并
concated$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});
