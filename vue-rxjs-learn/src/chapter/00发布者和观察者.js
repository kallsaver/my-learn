import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// 一般模型
// 发布者(Publisher)可订阅者 推送数据=> 观察者(Observer)
// 发布者(Publisher)可订阅者 <=订阅 观察者(Observer)

// Rxjs模型中
// 可订阅者(Observable) subscribe(强制订阅)=> 观察者生成(Observer)

// 观察者都是被动的存在,就像接收电台信号的人,或者接收光信息的物体
// 但是计算机模型中有趣的是只要没触发推送事件,他们就不存在,这样就不用消耗内存,
// 假如不是立刻产生,那么subscribe的参数是一个观察者的类,
// 要new一个观察者的实例,然后带上数据处理函数,
// 然而这些行为其实在subscribe函数内部已经做了,
// 所以subscribe的一个功能就是产生观察者的,事实上这个类就是Subscriber,
// Subscriber的父类是Subscription
// 一旦触发了可订阅对象的subscribe推送事件,
// 观察者就生成了并一直存在等待着next函数,除非complete销毁他们
// 可以说可订阅者发布事件是对观察者进行强制订阅,所以subscribe理解为强制订阅

// RxJs链式编程中Observable使用操作符返回的都是Observable类(可观察者==可订阅者)
// 使用subscribe返回Subscriber类(订阅者==观察者)

// 如何产生事件是发布者的责任,在RxJs中是Observale对象的工作
// 如何处理事件是观察者的责任，在RxJs中是subscribe的回调函数来决定
// 什么样的发布者关联什么样的观察者,就是何时调用subscribe

const source$ = Observable.of(1, 2, 3);

// 发布者强制订阅给观察者
source$.subscribe((item) => {
  console.log(item)
});



