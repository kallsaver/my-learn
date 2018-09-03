// add/operator目录下的操作符是对Observable全局的类打补丁,调用了全局都打了补丁
// 并且Tree Shaking会认为打补丁的方式是被引用的,不会判定为死代码
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const onSubscribe = observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
};

// created操作符等同于new
const source$ = Observable.create(onSubscribe);

// map操作符和数组的map方法类似
// 不同的是对其中每一个数据映射为一个新的Observable对象
// 这样就不会对上游的数据做任何修改
source$.filter((x) => x % 2 === 0).map(x => x * x).subscribe((item) => {
  console.log(item);
});

