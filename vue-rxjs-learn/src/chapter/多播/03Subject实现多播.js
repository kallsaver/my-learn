import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {interval} from 'rxjs/observable/interval';
import {map, take} from 'rxjs/operators';

// interval产生的是Cold Observable
const tick$ = interval(1000).pipe(take(3));

const subject = new Subject();

tick$.subscribe(subject);

subject.subscribe({
    next(value) {
        console.log('observer1', value);
    },
    complete() {
        console.log('complete');
    }
});

setTimeout(() => {
    subject.subscribe({
        next(value) {
            console.log('observer2', value);
        },
        complete() {
            console.log('complete');
        }
    });
}, 1500);
