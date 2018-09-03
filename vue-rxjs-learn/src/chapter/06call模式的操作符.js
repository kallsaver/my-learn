// rxjs/operator目录下的是非打补丁方式的操作符,是独立的函数,是call模式的操作符
// add/operator目录下的操作符是导入rxjs/Observable目录对应的操作符,
// 把函数挂载在Observable的prototype上
// 或者还可以用作静态操作符,直接挂载在Observable函数上,例如of
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {map} from 'rxjs/operator/map';

// 假如需要在rxjs/add/operator/double开发一个double操作符,功能是要用到map函数的
// 但是不希望引入double操作符也把map给挂载到Observable的实例上
// 使用bind,call方法,就避免了对Observale被污染的问题,这是开发库函数的通用做法
Observable.prototype.double = function () {
    // ::对call的改进是把调用者放在前面,更有利于链式编程
    return this::map(x => x * 2);
};

// of是对创建可订阅者Observable实例的一个便捷方法
const source$ = of(1, 2, 3);
const result$ = source$.double();

result$.subscribe(value => console.log(value));
