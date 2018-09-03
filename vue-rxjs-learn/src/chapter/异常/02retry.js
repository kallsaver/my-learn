import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/retry';

function getData () {

    let relative = {
        0: { pro: 80, data: '失败'},
        1: { pro: 15, data: '成功'},
        2: { pro: 5, data: '重试'},
    };

    function prizeRand(relative) {
        let sum = 0;
        let rand = 0;
        let result = {};
        // 计算总和
        for (let p in relative) {
            sum += relative[p]['pro']
        }

        // console.log('sum', sum);

        rand = Math.floor(Math.random() * sum + 1);

        console.log('rand', rand);

        for (var i in relative) {
            // 随机数落进了 0 ~ relative[i]['pro']的区域
            if (relative[i]['pro'] >= rand ) {
                result = relative[i];
                break;
            }else {
                // 没落进0 ~ 80 比如是90
                // 可以看出应该落在85~100
                rand -= relative[i]['pro'];
            }
        }
        return result;
    }

    let result = prizeRand(relative);

    // 以上代码是模仿请求成功和失败的情况
    return result;
}

// 请求源数据
const timer$ = Observable.timer(2000).mapTo(getData());

// 截取请求的数据进行分析处理
const error$ = timer$.map((result) => {
    if(result.data !== '成功') {
        console.log('请求失败');
        throw new Error('请求失败');
    }else {
        return result;
    }
});

// retry是对上游Observable的retry
const retry$ = error$.retry(5);

const catch$ = retry$.catch((err, caught$) => {
    // console.log('err', err);
    console.log('捕捉到了错误');
    // reuturn一个Observable,这个Observable的数据流将替代出错的数据
    return Observable.of(8);
});

catch$.subscribe({
    next(item) {
        console.log('catch$',item);
    },
    complete() {
        console.log('complete');
    }
});




