const path = require('node:path')

const Router = require('@koa/router')

const videoValidator = require('../middleware/validator/video')
const commonValidator = require('../middleware/validator/common')
const videoController = require('../controller/video')
const { jwt } = require('../utils')

const router = new Router()

/** 获取视频详情 */
router.get('/detail/:id', jwt.verifyToken(false), videoController.videoDetail)
/** 获取所有视频列表 */
router.get('/lists', commonValidator.pageSizeParams, videoController.list)
/** 创建视频 */
router.post('/create-video', jwt.verifyToken(), videoValidator.createVideo, videoController.createVideo)

/** 评论视频 */
router.post(
  '/comment/:videoId',
  jwt.verifyToken(),
  videoValidator.verifyVideoExists,
  videoValidator.commentVideo,
  videoController.commentVideo
)

/** 视频的评论列表 */
router.get(
  '/comment/lists/:videoId',
  commonValidator.pageSizeParams,
  videoValidator.verifyVideoExists,
  videoController.videoCommentList
)

/** 删除指定视频的指定评论 */
router.delete(
  '/comment/:commentId/:videoId',
  jwt.verifyToken(),
  videoValidator.verifyVideoExists,
  videoValidator.verifyCommentExists,
  videoController.deleteVideoComment
)

/** 喜欢指定视频 */
router.post('/like/:videoId', jwt.verifyToken(), videoValidator.verifyVideoExists, videoController.like)
/** 不喜欢指定视频 */
router.post('/dislike/:videoId', jwt.verifyToken(), videoController.dislike)
/** 获取当前用户喜欢视频的列表 */
router.get('/like-list', jwt.verifyToken(), commonValidator.pageSizeParams, videoController.likeList)
/** 收藏指定视频 */
router.post('/collect/:videoId', jwt.verifyToken(), videoValidator.verifyVideoExists, videoController.collectVideo)
/** 获取当前用户收藏视频的列表 */
router.get('/collect-list', jwt.verifyToken(), commonValidator.pageSizeParams, videoController.collectList)
/** 视频热度排行榜 */
router.get('/hot-rank', commonValidator.pageSizeParams, videoController.getHotVideoList)

module.exports = router.routes()
