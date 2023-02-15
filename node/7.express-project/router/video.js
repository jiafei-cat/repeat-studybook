const express = require('express')
const { videoController } = require('../controller')
const { jwt } = require('../utils')
const videoValidator = require('../middleware/validator/videoValidator')

const router = express.Router()

router.get('/:id', jwt.verifyToken(false), videoController.videoDetail)
router.get('/lists', videoController.list)

router.post('/create-video', jwt.verifyToken(), videoValidator.createVideo, videoController.createVideo)

module.exports = router