const redis = require('./index')

const REDIS_HOT_VIDEO_KEY = 'hotVideos'
/**
 * 设置视频热度分数
 * @rules 观看视频 + 1 / 喜欢视频 + 3 / 收藏视频 + 5 / 评论 + 5
 * @param {ObjectId} videoId 视频ID
 * @param {number} score 分数
 */
exports.setHotVideoScore = async (videoId, score) => {
  await redis.zincrby(REDIS_HOT_VIDEO_KEY, videoId, score)
}

/**
 * 获取热门视频
 * @param {number} start 开始
 * @param {number} stop 结束
 */
exports.getHotVideos = async (start = 0, stop = -1) => {
  const hotVideos = await redis.zrevrange(REDIS_HOT_VIDEO_KEY, start, stop, 'withscores')

  let cacheItem = {}
  const hotVideosList = hotVideos.reduce((pre, cur, index) => {
    if (index % 2 === 0) {
      cacheItem = {}
      cacheItem.videoId = cur
    } else {
      cacheItem.score = cur
      pre.push(cacheItem)
    }

    return pre
  }, [])

  return hotVideosList
}
