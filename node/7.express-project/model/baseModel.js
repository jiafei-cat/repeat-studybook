
module.exports = {
  createTime: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  updateTime: {
    type: Date,
    required: true,
    default: () => new Date(),
  }
}