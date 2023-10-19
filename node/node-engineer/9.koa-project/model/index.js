const mongoose = require('mongoose')
const userModel = require('./userModel')
const videoModel = require('./videoModel')
const subscribeModel = require('./subscribeModel')
const videoCommentModel = require('./videoCommentModel')
const videoLikeModel = require('./videoLikeModel')
const collectModel = require('./collectModel')

const { mongoDBUrl } = require('../config')

const allSchema = [userModel, videoModel, subscribeModel, videoCommentModel, videoLikeModel, collectModel]

/** mongoose 中间件 - 前置处理 */
function filterFieldsMiddleware(next) {
  this.select('-__v')
  next()
}

allSchema.forEach((schema) => {
  schema.pre(/^find/, filterFieldsMiddleware)
})

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
  User: mongoose.model('User', userModel),
  Video: mongoose.model('Video', videoModel),
  Subscribe: mongoose.model('Subscribe', subscribeModel),
  VideoComment: mongoose.model('VideoComment', videoCommentModel),
  VideoLike: mongoose.model('VideoLike', videoLikeModel),
  Collect: mongoose.model('Collect', collectModel),
}
