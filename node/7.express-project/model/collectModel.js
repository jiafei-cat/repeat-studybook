const mongoose = require('mongoose')
const baseModel = require('./baseModel')

module.exports = new mongoose.Schema({
  video: {
    type: mongoose.ObjectId,
    require: true,
    ref: 'Video',
  },
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User',
  },
  ...baseModel,
})
