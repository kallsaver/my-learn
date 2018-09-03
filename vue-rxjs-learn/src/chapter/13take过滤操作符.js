import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map'

// take可以从无限的数据流中截取从0开始的有限的数据流
const source1$ = Observable.interval(1000).map(x => x + 'a').take(3);

source1$.subscribe({
    next(item) {
        console.log(item);
    }
});
