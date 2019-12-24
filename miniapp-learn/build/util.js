const os = require('os')

function getLocalIP() {
  const network = os.networkInterfaces()
  for (const key in network) {
    let net = network[key]
    for (let i = 0; i < net.length; i++) {
      let face = net[i]
      if (
        face.family === 'IPv4'
        && face.address !== '127.0.0.1'
        && !face.internal
      ) {
        return face.address;
      }
    }
  }
  return 'localhost'
}

const DEFAULT_TIME_SLICE = 400

class Debounce {
  constructor(timeSlice = DEFAULT_TIME_SLICE) {
    this.timeSlice = timeSlice
  }
  run(func) {
    if (typeof func === 'function') {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(func, this.timeSlice)
    }
  }
  destroy() {
    clearTimeout(this.timer)
    this.timer = null
    this.timeSlice = null
  }
}

class Throttle {
  constructor(timeSlice = DEFAULT_TIME_SLICE) {
    this.timeSlice = timeSlice
  }
  run(func, overload) {
    const currentTime = new Date().getTime()
    if (!this.lastTime || currentTime - this.lastTime > this.timeSlice) {
      this.lastTime = currentTime
      if (typeof func === 'function') {
        func()
      }
    } else {
      if (typeof overload === 'function') {
        overload()
      }
    }
  }
  destroy() {
    this.timeSlice = null
    this.lastTime = null
  }
}

module.exports = {
  getLocalIP,
  Debounce,
  Throttle,
}
