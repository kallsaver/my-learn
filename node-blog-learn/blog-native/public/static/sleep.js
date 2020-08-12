console.log('sleep start')

function sleep(time) {
  const startTimeStamp = new Date().getTime()
  let currentTimeStamp = new Date().getTime()
  while (currentTimeStamp - startTimeStamp < time) {
    currentTimeStamp = new Date().getTime()
  }
}

sleep(10000)
console.log('sleep finish')
