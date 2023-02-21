const Redis = require('ioredis')
const { redisConfig } = require('../../config')

const redis = new Redis(redisConfig.port, redisConfig.path, redisConfig.options)

redis.on('error', err => {
  if (err) {
    console.log('redis connection failed')
    console.log(err)
    redis.quit()
  }
})

redis.on('ready', () => {
  console.log('redis connection succeeded')
})