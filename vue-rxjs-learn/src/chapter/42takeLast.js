import {take, takeLast} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {of} from 'rxjs/observable/of';

const source$ = interval(1000).pipe(take(5));
const last3$ = source$.pipe(
  takeLast(3)
);

last3$.subscribe({
  next(item) {
    if (item === -1) {
      console.log('没有符合的数据流');
    } else {
      console.log(item);
    }
  },
  complete() {
    console.log('complete');
  }
});
