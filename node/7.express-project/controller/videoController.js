const { Video, VideoComment } = require('../model')
const mongoose = require('mongoose')

/** 获取所有视频 */
exports.list = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body

  const videoList = await Video.find()
    .skip((pageNum - 1) * pageSize) // 跳过的条数
    .limit(pageSize) // 数量限制
    .sort({ createTime: -1 }) // 按照创建时间倒序排序返回
    .populate('user', '_id username avatar') // 填充关联id user集合中的字段

  const count = await Video.countDocuments()

  res.status(200).json({ videoList, count })
}

/** 视频入库 */
exports.createVideo = async (req, res) => {
  const userId = req.userinfo._id

  const videoModel = new Video({ ...req.body, user: userId })
  const dbResult = await videoModel.save()

  res.status(200).json({
    videoId: dbResult._id
  })
}

/** 视频详情 */
exports.videoDetail = async (req, res) => {
  const { id: vodVideoId } = req.params
  const targetVideo = await Video.find({ vodVideoId }).populate('user', '_id username cover')

  const { userinfo } = req
  // 是否是登录状态下获取视频详情
  if (userinfo) {
    // todo
  }

  res.send(targetVideo)
}

/** 视频评论 */
exports.commentVideo = async (req, res) => {
  const { _id } = req.userinfo
  const { videoId } = req.params
  const { content } = req.body

  if (!mongoose.isValidObjectId(videoId)) {
    res.status(402).send({
      mes: '请输入正确的视频id'
    })
    return
  }

  const isExistsVideo = await Video.findById(videoId)

  if (!isExistsVideo) {
    res.status(402).send({
      mes: '该视频不存在'
    })
    return
  }

  const saveCommentResult = new VideoComment({ user: _id, video: videoId, content }).save()
  isExistsVideo.commentCount++
  isExistsVideo.save()

  res.send({ msg: '评论成功' })
}

/** 视频的评论列表 */
exports.videoCommentList = async (req, res, next) => {
  const { videoId } = req.params
  const { pageNum = 1, pageSize = 10 } = req.body

  if (!mongoose.isValidObjectId(videoId)) {
    res.status(402).send({
      mes: '请输入正确的视频id'
    })
    return
  }

  const commentList = await VideoComment.find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createTime: -1 })
    .populate('user', '_id username avatar')

  const countVideoComment = await VideoComment.countDocuments()
  res.send({ list: commentList, count: countVideoComment })
}

/**
 * 删除指定视频的指定评论
 */
exports.deleteVideoComment = async (req, res) => {
  const { videoId, commentId } = req.params
  const { _id } = req.userinfo
  if (!mongoose.isValidObjectId(videoId) || !mongoose.isValidObjectId(commentId)) {
    res.status(402).send({
      mes: '请输入正确的视频或评论id'
    })
    return
  }

  const isExistsVideo = await Video.findById(videoId)

  if (!isExistsVideo) {
    res.status(404).send({
      mes: '该视频不存在'
    })
    return
  }

  const targetComment = await VideoComment.findOne({ _id: commentId, video: videoId })

  if (!targetComment) {
    res.status(404).send({
      mes: '该评论不存在'
    })
    return
  }

  if (_id !== targetComment.user.toString()) {
    res.status(403).send({
      mes: '您没有权限删除该评论'
    })
    return
  }

  await targetComment.remove()
  isExistsVideo.commentCount--
  await isExistsVideo.save()
  res.send({ mes: '删除成功' })
}