function formatDate(date, fmt) {
  if (/(Y+)/.test(fmt)) {
    // RegExp内存指向/(y+)/
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
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
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k]
      fmt = fmt.replace(RegExp.$1, padLeftZero(str))
    }
  }

  return fmt
}

function padLeftZero(str) {
  str = str + ''
  return ('00' + str).substr(str.length)
}

// 倒计时,最大时间单位:天
function getCountDownDHMS(secondsDifference) {
  if (secondsDifference < 0) {
    return '00:00:00:00'
  }

  let seconds = secondsDifference % 60
  let minutes = (secondsDifference - seconds) % (60 * 60) / 60
  let hours = (secondsDifference - seconds - minutes * 60) % (60 * 60 * 24) / (60 * 60)
  let days = secondsDifference / (60 * 60 * 24) | 0

  return `${padLeftZero(days)}:${padLeftZero(hours)}:${padLeftZero(minutes)}:${padLeftZero(seconds)}`
}
