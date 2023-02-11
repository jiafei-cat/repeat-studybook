const mongoose = require('mongoose')

async function main () {
  mongoose.connect('mongodb://127.0.0.1:27017/nodeTest')
}

main().then(res => {
  console.log('mongoDB connection is success!')
}).catch(error => {
  console.log(error)
})

module.exports = {
  User: mongoose.model('User', require('./userModel'))
}