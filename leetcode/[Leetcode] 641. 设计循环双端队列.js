/**
 * 做题总结:
 * 做提前明确，head指针一定是指向头节点位置，tail指针一定是指向尾节点位置的下一位
 * 每次取头节点指针不需要-1，每次取尾节点指针需要-1
 */
var MyCircularDeque = function(k) {
  this.queue = new Array(k)
  this.head = 0
  this.tail = 0
  this.count = 0
}


MyCircularDeque.prototype.insertFront = function(value) {
  if (this.isFull()) {
    return false
  }

  this.head = (this.head - 1 + this.queue.length) % this.queue.length
  this.queue[this.head] = value
  this.count += 1
  return true
}


MyCircularDeque.prototype.insertLast = function(value) {
  if (this.isFull()) {
    return false
  }

  this.queue[this.tail] = value
  this.tail = (this.tail + 1) % this.queue.length
  this.count += 1
  return true
}


MyCircularDeque.prototype.deleteFront = function() {
  if (this.isEmpty()) {
    return false
  }
  this.queue[this.head] = null
  this.head = (this.head + 1) % this.queue.length
  this.count -= 1
  return true
}


MyCircularDeque.prototype.deleteLast = function() {
  if (this.isEmpty()) {
    return false
  }

  this.queue[(this.tail - 1 + this.queue.length) % this.queue.length] = null
  this.tail = (this.tail - 1 + this.queue.length) % this.queue.length
  this.count -= 1
  return true
}

MyCircularDeque.prototype.getFront = function() {
  if (this.isEmpty()) {
    return -1
  }

  return this.queue[this.head]
}

MyCircularDeque.prototype.getRear = function() {
  if (this.isEmpty()) {
    return -1
  }

  return this.queue[(this.tail - 1 + this.queue.length) % this.queue.length]
}

MyCircularDeque.prototype.isEmpty = function() {
  return this.count === 0
}

MyCircularDeque.prototype.isFull = function() {
  return this.count === this.queue.length
}