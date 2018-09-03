import {takeUntil, concat} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';
import {interval} from 'rxjs/observable/interval';
import {_throw} from 'rxjs/observable/throw';
import {fromEvent} from 'rxjs/observable/fromEvent';

// takeUntil可以让一个Observable对象控制另一个Observable对象完结
// takeUntil不提供数据,只提供控制,经常配合timer,throw使用

// const source$ = interval(1000);
// const notifier$ = timer(2500);
// const takeUntil$ = source$.pipe(
//     takeUntil(notifier$)
// );

// takeUntil$.subscribe({
//     next(item) {
//         console.log(item);
//     },
//     complete() {
//         console.log('complete');
//     }
// });

// 只统计5秒内鼠标点击次数

const body = document.querySelector('body');

body.innerHTML = `<div>
                    <button id="clickMe">click me</button>
                    <div id="text">0</div>
                    <div id="end"></div>
                 </div>`;

let clickCount = 0;

const event$ = fromEvent(document.querySelector('#clickMe'), 'click');

const countDown$ = timer(5000);

const filtered$ = event$.pipe(
  takeUntil(countDown$)
);

countDown$.subscribe({
  complete() {
    document.querySelector('#end').innerText = '时间结束';
  }
});

filtered$.subscribe({
  next(event) {
    document.querySelector('#text').innerText = ++clickCount;
  }
});




