function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
  if (/(Y+)/.test(format)) {
    // RegExp内存指向/(y+)/
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    // es6正则写变量非常方便,用()定位,用RegExp.$1捕获
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k]
      format = format.replace(RegExp.$1, padLeftZero(RegExp.$1.length))
    }
  }
  return format
}

function stringRepeat(str, num) {
  return new Array(num + 1).join(str)
}

function padLeftZero(str, n) {
  n = n || 2
  return (stringRepeat('0', n) + str).substr(str.length)
}

// 倒计时
function formatCountDown(countDownStamp, format = 'DD天 hh:mm:ss') {
  if (countDownStamp < 0) {
    countDownStamp = 0
  }
  const millisecond = countDownStamp % 1000
  const restSecond = (countDownStamp - millisecond) / 1000
  const second = restSecond % 60
  const restMinute = (restSecond - second) / 60
  const minute = restMinute % 60
  const restHour = (restMinute - minute) / 60
  const hour = restHour % 24
  const restDay = (restHour - hour) / 24
  const day = restDay
  const o = {
    'D+': day,
    'h+': hour,
    'm+': minute,
    's+': second,
    't+': millisecond
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k] + ''
      format = format.replace(RegExp.$1, padLeftZero(str, RegExp.$1.length))
    }
  }
  return format
}
