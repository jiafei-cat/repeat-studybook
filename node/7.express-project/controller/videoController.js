const { Video } = require('../model')

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