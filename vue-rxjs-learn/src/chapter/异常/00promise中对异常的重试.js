// 在Promise中,如果发生了错误,不能重试,除非初始化整个外部函数
// 但是这样做也有问题,就是可能会陷入死循环,
// 只能通过外部的变量来控制尝试的次数避免死循环
// 或者可以封装,用回调函数可以实现继承的作用

let tryCount = 0;

function pageInit() {
  run();
  function run() {
    function getData() {
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          // 失败的概率比成功多
          // 概率问题就是落点面积占比问题
          let relative = {
            0: { pro: 80, data: '失败'},
            1: { pro: 15, data: '成功'},
            2: { pro: 5, data: '重试'},
          };

          let result = prizeRand(relative);

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

          switch(result.data) {
            case '失败': reject(result.data);
            case '重试': reject(result.data);break;
            case '成功': resolve(result.data);break;
          }
        },1000);
      });
      return p;
    }

    getData().then((data) => {
      console.log('then');
      console.log(data);
    }).catch((err) => {
      console.log('catch');
      ++tryCount;
      // 只重试5次
      if (tryCount < 6) {
        run();
      }
      console.log(err);
    });
  }
};

pageInit();


