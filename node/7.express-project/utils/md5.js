const crypto = require('crypto')

/** 盐值 */
const salt = 'nodeTest'

module.exports = string => {
  return crypto
    .createHash('md5')
    .update(`${salt}${string}`)
    .digest('hex')
}