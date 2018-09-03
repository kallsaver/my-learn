// 创建类操作符大部分都是静态操作符,但是repeat就不是
import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/repeat';
import  {repeat} from 'rxjs/operators/repeat';

const source$ = Observable.create(observer => {
    console.log('subscribe');
    setTimeout(() => observer.next(1), 1000);
    setTimeout(() => observer.next(2), 2000);
    setTimeout(() => observer.next(3), 3000);
    // repeat只有在上游Observable对象完结后才重新订阅
    // 因为repeat不知道会不会有新的数据从上游被推送下来
    setTimeout(() => observer.complete(), 4000);

    return {
        unsubscribe() {
            console.log('unsubscribe');
        }
    }
});

const repeated$ = source$.pipe(
    repeat(2)
);

repeated$.subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
});


