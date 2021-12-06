/**
 * 做题总结:
 * 在循环一个值时，取余操作非常有用，但是在取值的时候也不要忘记用取余后的结果
 */
var MyCircularQueue = function(k) {
  this.queue = new Array(k)
  this.head = 0
  this.tail = 0
  this.count = 0
}

MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) {
    return false
  }

  this.queue[this.tail] = value
  this.tail = (this.tail + 1) % this.queue.length
  this.count += 1
  return true
}

MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) {
    return false
  }

  this.queue[this.head] = null
  this.head = (this.head + 1) % this.queue.length
  this.count -= 1
  return true
}

MyCircularQueue.prototype.Front = function() {
  if (this.isEmpty()) {
    return -1
  }

  return this.queue[this.head]
}

MyCircularQueue.prototype.Rear = function() {
  if (this.isEmpty()) {
    return -1
  }

  return this.queue[(this.tail - 1 + this.queue.length) % this.queue.length]
}

MyCircularQueue.prototype.isEmpty = function() {
  return this.count === 0
}

MyCircularQueue.prototype.isFull = function() {
  return this.count === this.queue.length
}
