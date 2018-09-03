import { Observable } from 'rxjs/Observable';


// create操作符是一个没有上游,所以对原始数据的处理只能放在回调函数里面
// create会返回一个Observable对象
// Observable.create(observer => {
//   observer.next(1);
// }).subscribe((item) => console.log(item))

// new Observable(observer => {
//   observer.next(1);
// }).subscribe({
//   next(item){
//     console.log(item)
//   }
// });

// 一种生成可订阅者的方式
const source$ = new Observable(observer => {
  observer.next('source');
});


