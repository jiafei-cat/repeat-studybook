const mongoose = require('mongoose')
const { mongoDBUrl } = require('../config')

async function main () {
  mongoose.connect(mongoDBUrl)
}

/** 链接数据库 */
main().then(res => {
  console.log('mongoDB connection is success!')
}).catch(error => {
  console.log(error)
})

module.exports = {
  User: mongoose.model('User', require('./userModel'))
}