const Redis = require('ioredis')
const {
  redisConfig: { port, path, options },
} = require('../../config')

const redis = new Redis(port, path, options)

redis.on('error', (err) => {
  if (err) {
    console.log('redis connection failed')
    console.log(err)
    redis.quit()
  }
})

redis.on('ready', async () => {
  console.log('redis connection succeeded')
})

module.exports = redis
