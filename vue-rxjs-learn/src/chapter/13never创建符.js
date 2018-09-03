import {interval} from 'rxjs/observable/interval';
import {never} from 'rxjs/observable/never';

import {concat, take} from 'rxjs/operators';

// never()会创建一个没有数据流但是永远不会完结的Observable
// 和concat一起用可以让一个有完结的Observable映射一个数据流一样但是不会完结的Observable

const source$ = interval(1000).pipe(
    take(2),
    concat(never())
).subscribe({
    next(item) {
        console.log(item);
    },
    complete() {
        console.log('complete');
    }
})
