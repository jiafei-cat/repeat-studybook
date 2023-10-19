const mongoose = require('mongoose')
const { mongoDBUrl } = require('../config')

async function main() {
  mongoose.connect(mongoDBUrl)
}

/** 链接数据库 */
main()
  .then((res) => {
    console.log('mongoDB connection is success!')
  })
  .catch((error) => {
    console.log(error)
  })

/**
 * mongoose.model后会自动创建表，表名则是第一次个参数加上 's'并且小写
 * 例如:
 * mongoose.model('User'...) => 表名 -> users
 */
module.exports = {
  User: mongoose.model('User', require('./userModel')),
  Video: mongoose.model('Video', require('./videoModel')),
  Subscribe: mongoose.model('Subscribe', require('./subscribeModel')),
  VideoComment: mongoose.model('VideoComment', require('./videoCommentModel')),
  VideoLike: mongoose.model('VideoLike', require('./videoLikeModel')),
  Collect: mongoose.model('Collect', require('./collectModel')),
}
