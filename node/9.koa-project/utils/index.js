const md5 = require('./md5')
const jwt = require('./jwt')

const commonResponse = (status, message = 'success', data = null) => ({
  code: status,
  mes: message,
  data,
})

module.exports = {
  md5,
  jwt,
  commonResponse,
}
