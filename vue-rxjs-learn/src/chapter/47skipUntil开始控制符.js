import {skipUntil, concat} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';
import {interval} from 'rxjs/observable/interval';
import {_throw} from 'rxjs/observable/throw';
import {fromEvent} from 'rxjs/observable/fromEvent';

// skipUntil开始控制符

const source$ = interval(1000);
const notifier$ = timer(2500);
const skipUntil$ = source$.pipe(
  skipUntil(notifier$)
);

skipUntil$.subscribe({
  next(item) {
    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});
