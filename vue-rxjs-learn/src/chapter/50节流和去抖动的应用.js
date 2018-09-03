import {throttleTime} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';

const body = document.getElementsByTagName('body')[0];

body.innerHTML = `<div>
                    <button id="clickMe">click me</button>
                    <div id="text">0</div>
                 </div>`;

let clickCount = 0;
const event$ = fromEvent(document.querySelector('#clickMe'), 'click')
    .pipe(
        throttleTime(1000)
    );

event$.subscribe({
    next(event) {
        console.log(event);
        document.querySelector('#text').innerText = ++clickCount;
    }
});
