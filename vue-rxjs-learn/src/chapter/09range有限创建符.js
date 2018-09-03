// import 'rxjs/add';
import {range} from 'rxjs/observable/range';
import {map, filter} from 'rxjs/operators';

// range的参数只能写正整数
const source$ = range(1, 10);

const result$ = source$ |> map(x => x * 2);

result$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});
