import {Observable} from 'rxjs/Observable';

const onSubscribe = observer => {
    observer.next({
        obj: {
            count: 1
        }
    });
    observer.next({
        obj: {
            count: 2
        }
    });
    observer.next({});
    observer.next({
        obj: {
            count: 4
        }
    });
    //observer.error('异常');
};

const source$ = Observable.create(onSubscribe);

// create可以理解为是一个不用处理上游的操作符
// 所以它的原始数据和回调函数的数据加工是同一个数据
// 其它操作符的observer.next需要放在主函数体里面
// 回调函数只提供优雅的数据映射方式

// 自定义操作符的功能是:
// 返回一个全新的Observale(可订阅)对象
// 是对上游推送的任何数据做一个映射,产生新的数据推送给下游
// 具体如何映射,由操作符中的回调函数决定
// 处理异常情况
// 及时释放资源

function map(callback) {

    if (typeof callback !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }

    // 操作符其实同时是一个观察者也是一个可订阅者,
    // 把上游可订阅对象的数据触发了推送,并处理成新的发布数据,封装成可订阅对象
    return new Observable(observer => {
        // 箭头函数是穿透的,this是map的调用者,也就是source$上游的数据流
        // 可订阅者触发了强制订阅行为,订阅者立刻产生
        this.subscribe({
            next(value) {
                try {
                    // callback中的代码可能是有问题的代码,
                    // 这超出了主函数对回调函数的控制
                    // 能做得就是考虑到回调函数出错然后告诉使用者
                    // 在这个环节不进行错误处理,
                    // 把错误传到下游去处理
                    // 甚至可以无视语法错误,不让程序挂起
                    observer.next(callback(value));
                } catch (err) {
                    observer.error(err);
                }
            },
            error(err) {
                observer.error(err);
            },
            complete() {
                observer.complete();
            }
        })
    })
};

// 只所以不使用Observable.prototype.map是因为可能会覆盖
// 并且ES Module和require都是指针,所以可能和其他地方冲突
source$::map(x => {
    x.obj.count = x.obj.count * x.obj.count;
    return x;
}).subscribe({
    next(item) {
        console.log(item.obj.count);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('complete');
    }
});


