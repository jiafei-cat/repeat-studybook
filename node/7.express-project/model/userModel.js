const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const { md5 } = require('../utils')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value)
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: true,
    default: () => `https://i.pravatar.cc/300?img=${~~((Math.random() * 500) + 1)}`
  },
  ...baseModel,
})

module.exports = userSchema