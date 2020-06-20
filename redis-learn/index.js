const redis = require('redis')

const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on('error', (err) => {
  console.log('--')
  console.log(err)
})

redisClient.set('myname', 'test', redis.print)

redisClient.get('myname', (err, val) => {
  if (err) {
    return
  }
  console.log(val)
})

