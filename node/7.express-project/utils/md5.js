const crypto = require('crypto')

const salt = 'nodeTest'
module.exports = string => {
  return crypto
    .createHash('md5')
    .update(`${salt}${string}`)
    .digest('hex')
}