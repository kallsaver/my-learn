// 在lettbale操作符概念提出来之前,let操作符就存在了,而且是传统的形式,即通过打补丁的形式
// RxJs在引入lettable操作符之后依然保留打补丁和call方法的操作符模式,完全是为了向后兼容

import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

// const source$ = of(1, 2, 3);
// const double$ = obs$ => obs$.map(x => x * x);
// let被调用时,实际上就是把上游的Observale对象作为double回调函数的参数,
// 然后把return的Observale返回的Observale交给下游订阅
// const result$ = source$.let(double$);
// source$传给obs$,这种传参是简单的语法结构上的实现
// 可订阅者的next参数传给x是通过subscribe触发自然就在观察者的next中捕捉到这个值,
// 然后把这个值作为实参传给map操作符封装好的接受载体上,巧合就是map封装的的回调参数
// 这种传参方式只能在函数内部分析(subscribe),不能通过语法结构的类比,
// 很强大灵活但是暗箱不好理解,可以称为载体传参,通过订阅观察设计模式实现
// const result$ = source$.let(obs$ => obs$.map(x => x * x));
// const subscription = result$.subscribe(item => console.log(item));


// 不使用补丁操作符map
const source$ = of(1, 2, 3);
const map = function (callback) {
    // obs$是let函数传递过来的
    return function (obs$) {
        console.log('obs$ === source$', obs$ === source$);
        return new Observable(observer => {
            // 上游Observable被订阅了
            obs$.subscribe({
                // 秒就妙在参数传递利用了subscribe,观察者next捕捉到可订阅者的next参数
                next(value) {
                    // callback可以称为是载体
                    observer.next(callback(value));
                }
            });
        });
    };
};

const result$ = source$.let(map(x => x * x));

const subscription = result$.subscribe(item => console.log(item));
