import {skip} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';

// skip跳过符,和take刚好相反的策略

const source$ = interval(1000);
const skip$ = source$.pipe(
  skip(3)
);

skip$.subscribe({
  next(item) {
    console.log(item);
  }
});
