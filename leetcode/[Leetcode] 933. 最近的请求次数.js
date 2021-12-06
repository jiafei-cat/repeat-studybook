/**
 * 题目得意思将当前推进来的时间减去最开始进来的值是否大于3000，大于就推出队列
 */
var RecentCounter = function() {
  this.queue = new Array()
}

RecentCounter.prototype.ping = function(t) {
  // 每次进来与第一次进来的元素对比，如果差值大于3000, 说明第一个值过期了，就需要将它推出
  while (this.queue.length && t - this.queue[0] > 3000) {
    this.queue.shift()
  }

  this.queue.push(t)

  return this.queue.length // 将alive的时间个数返回
}
