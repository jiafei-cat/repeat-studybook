const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const baseOptions = require('./baseOptions')

module.exports = new mongoose.Schema(
  {
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
  },
  baseOptions
)
