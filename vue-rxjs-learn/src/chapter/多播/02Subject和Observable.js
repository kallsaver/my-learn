import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {interval} from 'rxjs/observable/interval';
import {map} from 'rxjs/operators';

// Observable不会记得有哪些Observer订阅自己
// Subject会记得有哪些Observer订阅自己

const subject = new Subject();

const subscription1 = subject.subscribe({
    next(value) {
        console.log('subscription1', value);
    },
    complete() {
        console.log('complete');
    }
});

subject.next(1);

const subscription2 = subject.subscribe({
    next(value) {
        console.log('subscription2', value);
    },
    complete() {
        console.log('complete');
    }
});

subject.next(2);

subscription1.unsubscribe();

subject.next(3);

const interval$ = interval(3000);

const intervalSubscription1 = interval$.subscribe({
    next(value) {
        console.log('intervalSubscription1', value);
    },
    complete() {
        console.log('complete');
    }
});

const intervalSubscription2 = interval$.subscribe({
    next(value) {
        console.log('intervalSubscription2', value);
    },
    complete() {
        console.log('complete');
    }
});

setTimeout(() => {
    intervalSubscription1.unsubscribe();
}, 6000)


