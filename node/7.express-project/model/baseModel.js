/** 通用数据模型 */
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