import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {interval} from 'rxjs/observable/interval';
import {map, take, multicast} from 'rxjs/operators';

const coldSource$ = interval(1000).pipe(take(5));

const tick$ = coldSource$.pipe(
    multicast(new Subject()),
).refCount();

tick$.subscribe({
    next(value) {
        console.log('observer1', value);
    },
    complete() {
        console.log('complete');
    }
});

setTimeout(() => {
    tick$.subscribe({
        next(value) {
            console.log('observer2', value);
        },
        complete() {
            console.log('complete');
        }
    });
}, 1500);

//tick$.connect();
