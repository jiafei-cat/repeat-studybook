const express = require('express')
const { videoController } = require('../controller')
const { jwt } = require('../utils')
const videoValidator = require('../middleware/validator/videoValidator')
const commonValidator = require('../middleware/validator/commonValidator')

const router = express.Router()

router.get('/detail/:id', jwt.verifyToken(false), videoController.videoDetail)
router.get('/lists', commonValidator.pageSizeParams, videoController.list)

router.post('/create-video', jwt.verifyToken(), videoValidator.createVideo, videoController.createVideo)

router.post(
  '/comment/:videoId',
  jwt.verifyToken(),
  videoValidator.verifyVideoExists,
  videoValidator.commentVideo,
  videoController.commentVideo
)
router.get(
  '/comment/lists/:videoId',
  commonValidator.pageSizeParams,
  videoValidator.verifyVideoExists,
  videoController.videoCommentList
)
router.delete(
  '/comment/:commentId/:videoId',
  jwt.verifyToken(),
  videoValidator.verifyVideoExists,
  videoValidator.verifyCommentExists,
  videoController.deleteVideoComment
)

router.post('/like/:videoId', jwt.verifyToken(), videoValidator.verifyVideoExists, videoController.like)
router.post('/dislike/:videoId', jwt.verifyToken(), videoController.dislike)
router.get('/like-list', jwt.verifyToken(), commonValidator.pageSizeParams, videoController.likeList)

router.post('/collect/:videoId', jwt.verifyToken(), videoValidator.verifyVideoExists, videoController.collectVideo)
router.get('/collect-list', jwt.verifyToken(), commonValidator.pageSizeParams, videoController.collectList)

router.get('/hot-rank', commonValidator.pageSizeParams, videoController.getHotVideoList)

module.exports = router
