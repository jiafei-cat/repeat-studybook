const { Video, VideoComment, VideoLike, Collect } = require('../model')
const { setHotVideoScore, getHotVideos } = require('../model/redis/hotVideo')
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
    videoId: dbResult._id,
  })
}

/** 视频详情 */
exports.videoDetail = async (req, res) => {
  const { id: vodVideoId } = req.params
  const targetVideo = await Video.findById(vodVideoId).populate('user', '_id username cover')

  const { userinfo } = req
  // 登录状态下多返回信息
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

  const saveCommentResult = new VideoComment({ user: _id, video: videoId, content }).save()
  const targetVideo = await Video.findById(videoId)

  await setHotVideoScore(5, videoId)
  targetVideo.commentCount++
  targetVideo.save()

  res.send({ msg: '评论成功' })
}

/** 视频的评论列表 */
exports.videoCommentList = async (req, res, next) => {
  const { videoId } = req.params
  const { pageNum = 1, pageSize = 10 } = req.body

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

  const targetComment = await VideoComment.findOne({ _id: commentId, video: videoId })

  if (_id !== targetComment.user.toString()) {
    res.status(403).send({
      mes: '您没有权限删除该评论',
    })
    return
  }
  const targetVideo = await Video.findById(videoId)
  await setHotVideoScore(-5, videoId)

  await targetComment.remove()
  targetVideo.commentCount--
  await targetVideo.save()
  res.send({ mes: '删除成功' })
}

/** 合并喜欢不喜欢视频逻辑 */
const toggleLikeVideoLogic = (likeType = 1) => {
  return async (req, res) => {
    const { videoId } = req.params
    const { _id } = req.userinfo
    const likeMessage = {
      '-1': '不喜欢',
      1: '喜欢',
    }

    const isExistedLike = await VideoLike.findOne({ user: _id, video: videoId })
    /** 热度分数 */
    const hotScore = likeType === 1 ? 3 : -3

    /** 创建一条视频与用户的关联记录 */
    if (!isExistedLike) {
      const newVideoLike = new VideoLike({
        user: _id,
        video: videoId,
        type: likeType,
      }).save()

      await setHotVideoScore(hotScore, videoId)
      res.send({ msg: `${likeMessage[likeType]}该视频成功` })
      return
    }

    if (isExistedLike.type === likeType) {
      await isExistedLike.remove()
      await setHotVideoScore(hotScore, videoId)
      res.send({ msg: `已经取消该${likeMessage[likeType]}` })
      return
    }

    if (isExistedLike.type !== likeType) {
      isExistedLike.type = likeType
      await isExistedLike.save()
      await setHotVideoScore(hotScore, videoId)
      res.send({ msg: `${likeMessage[likeType]}该视频成功` })
      return
    }

    res.send(404).send({
      msg: '404 not find',
    })
  }
}
/** 喜欢视频 */
exports.like = toggleLikeVideoLogic(1)

/** 不喜欢视频 */
exports.dislike = toggleLikeVideoLogic(-1)

/** 用户喜欢的视频列表 */
exports.likeList = async (req, res) => {
  const { _id } = req.userinfo
  const { pageNum = 1, pageSize = 10 } = req.body

  const videoLikeList = await VideoLike.find({ user: _id, type: 1 })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createTime: -1 })

  const count = await VideoLike.countDocuments({
    type: 1,
  })

  res.send({
    list: videoLikeList,
    count,
  })
}

/** 视频收藏/取消收藏 */
exports.collectVideo = async (req, res) => {
  const { _id } = req.userinfo
  const { videoId } = req.params
  const isCollected = await Collect.findOne({ video: videoId, user: _id })
  if (!isCollected) {
    const newCollect = new Collect({ video: videoId, user: _id })
    await newCollect.save()
    await setHotVideoScore(5, videoId)
    res.send({ msg: `收藏该视频成功` })
    return
  }
  await isCollected.remove()
  await setHotVideoScore(-5, videoId)
  res.send({ msg: `您已成功取消该视频收藏` })
}

/** 用户收藏的视频列表 */
exports.collectList = async (req, res) => {
  const { _id } = req.userinfo
  const { pageNum = 1, pageSize = 10 } = req.body

  const videoCollectList = await Collect.find({ user: _id, type: 1 }, 'video')
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createTime: -1 })
    .populate('video', 'title description videoCover commentCount')

  const count = await Collect.countDocuments({
    type: 1,
  })

  res.send({
    list: videoCollectList,
    count,
  })
}

/** 获取热门视频 */
exports.getHotVideoList = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body
  const hotVideos = await getHotVideos((pageNum - 1) * pageSize, pageSize * pageNum - 1)

  const idArray = hotVideos.map((item) => item.videoId).filter((item) => mongoose.isValidObjectId(item))
  const hotVideosList = await Video.find({ _id: { $in: idArray } })
    .populate('user', '_id username')
    .lean()

  hotVideosList.forEach(
    (item) => (item.hotScore = hotVideos.find((cItem) => cItem.videoId === String(item._id))?.score || 0)
  )
  res.send({ list: hotVideosList })
}
