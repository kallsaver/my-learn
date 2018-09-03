import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/observable/interval';
import {map} from 'rxjs/operators';

// Subject同时也是一个Observabel对象
const subject = new Subject();

subject.pipe(
    map(x => x * 2)
).subscribe({
    next(value) {
        console.log(value);
    },
    complete() {
        console.log('complete');
    }
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.complete();
