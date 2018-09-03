import {Observable} from 'rxjs/Observable';
import {ajax} from 'rxjs/observable/dom/ajax';
import {fromEvent} from 'rxjs/observable/fromEvent';

const body = document.getElementsByTagName('body')[0];

body.innerHTML = `<div>
                    <button id="getStar">get Rxjs star count</button>
                    <div id="text"></div>
                 </div>`;

fromEvent(document.querySelector('#getStar'), 'click').subscribe({
  next() {
    ajax('https://api.github.com/repos/ReactiveX/rxjs', {
      responseType: 'json'
    }).subscribe({
      next(response) {
        console.log(response);
        const starCount = response.response.stargazers_count;
        document.querySelector('#text').innerText = starCount;
      }
    });
  }
});
