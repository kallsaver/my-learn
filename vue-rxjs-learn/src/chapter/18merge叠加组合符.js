// merge同样有静态操作符和实例操作符
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import {fromEvent} from 'rxjs/observable/fromEvent';

// merge和concat不同,merge会第一时间订阅所有上游的数据流,先到先上场
// merge用于合并异步数据流
// 同步数据流应该用concat
// merge最后一个参数如果是数字,用于指定可以合并的个数,多出的Observable不会合并
// 如果从弹珠图看,merge是叠加几条弹珠时间线

const source1$ = Observable.timer(0, 1000).map(x => x + 'A');
const source2$ = Observable.timer(500, 1000).map(x => x + 'B');
const source3$ = Observable.timer(800, 1000).map(x => x + 'C');

const merged$ = Observable.merge(source1$, source2$, source3$, 2);

merged$.subscribe({
    next(item) {
        console.log(item);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('complete');
    }
});

const app = document.querySelector('#app');

const click$ = fromEvent(app, 'click');

const touchend$ = fromEvent(app, 'touchend');

const touchstart$ = fromEvent(app, 'touchstart');

touchstart$.subscribe({
    next() {
        console.log('touchstart');
    }
});

touchend$.subscribe({
    next() {
        console.log('touchend');
    }
});

click$.subscribe({
    next() {
        console.log('click');
    }
});

// Observable.merge(click$, touchend$).subscribe({
//     next(event) {
//         console.log('666');
//     }
// });

