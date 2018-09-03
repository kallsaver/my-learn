import {max, min} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const source$ = of(
    {name: 'RxJs', year: 2011},
    {name: 'React', year: 2013},
    {name: 'Redux', year: 2015},
)

// min和max其实有一个就行

const min$ = source$.pipe(
    // false的继续比较
    min((a, b) => a.year - b.year)
);

min$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

const max$ = source$.pipe(
    // true的继续比较
    max((a, b) => a.year - b.year)
);

max$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});

