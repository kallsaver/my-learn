import {of} from 'rxjs/observable/of';

const source$ = of(1, 2, 3);

source$.subscribe({
  next(item) {
    console.log(item);
  },
  complete() {
    console.log('complete');
  }
});
