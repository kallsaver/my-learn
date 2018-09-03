const PromiseRetryer = require('promise-retryer')(Promise);

PromiseRetryer.run({
  delay: 1000,
	maxRetries: 5,
	promise: function (attempt) {
    console.log(attempt);
		return getData(); // returns a promise
	}
}).then(
	function (response) {
		console.log(response);
	}
).catch(
	function (error) {
		console.log(error);
  }
);

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
          sum += relative[p]['pro'];
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
        case '失败': reject(result.data);break;
        case '重试': reject(result.data);break;
        case '成功': resolve(result.data);break;
      }
    },1000)
  });
  return p;
}
