import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const throwErrorNumber = value => {
    if (value === 4) {
        throw new Error('error number')
    }
    return value;
}

const source$ = Observable.range(1, 5);

const error$ = source$.map(throwErrorNumber);

const catch$ = error$.catch((err, caught$) => {
    // console.log('err', err);
    console.log('捕捉到了错误');
    // reuturn一个Observable,这个Observable的数据流将替代出错的数据
    return Observable.of(8);
});

// 注意catch$要比error$先触发
// catch$是最后要使用的数据流
catch$.subscribe({
    next(item) {
        console.log('catch$',item);
    },
    complete() {
        console.log('complete');
    }
});

error$.subscribe({
    next(item) {
        console.log('error$',item);
    },
    complete() {
        console.log('complete');
    }
});




