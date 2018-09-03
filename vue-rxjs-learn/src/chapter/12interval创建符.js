
import {interval} from 'rxjs/observable/interval';
import {map} from 'rxjs/operators/map';

// interval的数据流是从0开始的
const source$ = interval(1000);

const result$ = source$.pipe(
    map(x => x + 1)
);

result$.subscribe({
    next(item) {
        console.log(item);
    }
});
