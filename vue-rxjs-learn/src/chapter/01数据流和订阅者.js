import { Observable } from 'rxjs/Observable';

let a = {
  name: 'a'
};

let b = {
  name: 'b'
};

// 定义一个数据流函数,
// 函数的参数是一个对象,并定义了对象的迭代行为(next的传参)
// 这个环节是推送数据流的
// 就相当于定义了数组和数组的map方法
// 这里是写业务代码的地方
// 好比信号塔发送给电视的频率信息
const onSubscribe = observer => {
  // next, error传过去的都是指针
  // observer.next(a);
  // observer是一个对theObserver的包装
  // observer.next(observer === theObserver);
  // observer.next(observer);
  // error触发后,数据不再推送
  observer.error(b);
  observer.next(1);
  observer.next(2);
  observer.next(3);
  // complete没有参数, complete执行后
  // complete执行后的语句都不会触发推送消息了
  observer.complete();
};

// 定义一个对象,next是它对迭代器行为函数的处理
// 它的格式就是rxjs中观察者的格式
// 这个环节是定义处理数据的
// 就相当于数组的map方法的回调函数
// 所谓的观察者就是对订阅的数据做出反应,
// 相当于on事件定义里的回调函数
// 电视的处理方式(全屏,音量大小等)
const theObserver = {
  // 事件推送的处理函数
  next(item) {
    if (item.name === 'a') {
      console.log('item === a', item === a);
    } else {
      console.log(item);
    }
  },
  // 异常的处理函数
  error(err) {
    if (err.name === 'b') {
      console.log('err === b', err === b);
    } else {
      console.log(err)
    }
  },
  // 如果不需要对异常处理,需要用null作为第二个参数站位
  // 事件推送完的处理函数
  complete() {
    console.log('推送数据完毕')
  },
};

// 把数据流函数的参数变成一个可观察对象,(可观察对象==发布者==可订阅者)
// 频率信息传给了电视并进行解码,把信息处理成订阅者(观察者)能解读的格式
const source$ = new Observable(onSubscribe);

console.log(source$);

// 传入合适的观察者并发布订阅
// 电视的各种设置(观察者的处理函数)完成,开始收看
// 发布者订阅==产生了观察者
// subscribetion是观察者
subscribetion = source$.subscribe(theObserver);



