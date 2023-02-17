const express = require('express')
const { videoController } = require('../controller')
const { jwt } = require('../utils')
const videoValidator = require('../middleware/validator/videoValidator')

const router = express.Router()

router.get('/detail/:id', jwt.verifyToken(false), videoController.videoDetail)
router.get('/lists', videoController.list)

router.post('/create-video', jwt.verifyToken(), videoValidator.createVideo, videoController.createVideo)
router.post('/comment/:videoId', jwt.verifyToken(), videoValidator.commentVideo, videoController.commentVideo)
router.get('/comment/lists/:videoId', jwt.verifyToken(), videoController.videoCommentList)
router.delete('/comment/:commentId/:videoId', jwt.verifyToken(), videoController.deleteVideoComment)

module.exports = router