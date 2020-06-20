const redis = require('redis')
const { REDIS_CONFIG } = require('../config/index')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisClient.on('error', () => {

})

function promiseify(api, ...rest) {
  return new Promise((resolve) => {
    api(...rest, (err, ret) => {
      resolve([err, ret])
    })
  })
}

function redisSet(key, val) {
  return new Promise((resolve) => {
    if (val && typeof val === 'object') {
      val = JSON.stringify(val)
    }
    redisClient.set(key, val.toString(), (err, ret) => {
      // ret: OK
      resolve([err, ret])
    })
  })
}

function redisGet(key) {
  return new Promise((resolve) => {
    redisClient.get(key, (err, ret) => {
      if (ret) {
        try {
          ret = JSON.parse(ret)
        } catch {
          ret = ret
        }
      }
      resolve([err, ret])
    })
  })
}

function redisDel(key) {
  return new Promise((resolve) => {
    redisClient.del(key, (err, ret) => {
      resolve([err, ret])
    })
  })
}

module.exports = {
  redisSet,
  redisGet,
  redisDel,
}
