// 暴力
var MedianFinder = function() {
  this.queue = []
}

MedianFinder.prototype.addNum = function(num) {
  this.queue.push(num)
}

MedianFinder.prototype.findMedian = function() {
  this.queue.sort((a, b) => a - b)
  if (this.queue.length % 2 === 0) {
    let index = this.queue.length / 2
    return (this.queue[index] + this.queue[index - 1]) / 2
  }

  return this.queue[this.queue.length >> 1]
}


// 利用大小堆维护
var MedianFinder = function() {
  this.minHeap = new MinOrMaxHeap((heap, a, b) => heap[a] < heap[b])
  this.maxHeap = new MinOrMaxHeap((heap, a, b) => heap[a] > heap[b])
}

MedianFinder.prototype.addNum = function(num) {
  if (this.maxHeap.size() === 0 || this.maxHeap.peak() > num) {
    this.maxHeap.push(num)
  } else {
    this.minHeap.push(num)
  }
  // 当大堆数量比小堆数量多(-1是中间数)，将大堆移动一位到小堆，保持左右平衡
  if (this.maxHeap.size() - 1 > this.minHeap.size()) {
    this.minHeap.push(this.maxHeap.pop())
  }
  if (this.minHeap.size() > this.maxHeap.size()) {
    this.maxHeap.push(this.minHeap.pop())
  }
}

MedianFinder.prototype.findMedian = function() {
  let count = this.minHeap.size() + this.maxHeap.size()

  if (count % 2 === 0) {
    return (this.minHeap.peak() + this.maxHeap.peak()) / 2
  }

  return this.maxHeap.peak()
}

class MinOrMaxHeap {
  constructor(compare) {
    this.heap = []
    this.compare = (a, b) => compare(this.heap, a, b)
  }

  push(val) {
    this.heap.push(val)
    this.shiftUp(this.size() - 1)
  }
  pop() {
    if (this.size() === 0) return null
    this.swap(0, this.size() - 1)
    let result = this.heap.pop()
    this.shiftDown(0)
    return result
  }
  shiftUp(index) {
    while(index > 0) {
      let parentIndex = (index - 1) >> 1
      if (this.compare(index, parentIndex)) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        break
      }
    }
  }
  shiftDown(index) {
    while(index < this.size() - 1) {
      let leftIndex = index * 2 + 1
      let rightIndex = index * 2 + 2
      let temp = index
      if (this.heap[leftIndex] && this.compare(leftIndex, temp)) {
        temp = leftIndex
      }
      if (this.heap[rightIndex] && this.compare(rightIndex, temp)) {
        temp = rightIndex
      }

      if (temp !== index) {
        this.swap(temp, index)
        index = temp
      } else {
        break
      }
    }
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
  peak() {
    if (this.size() === 0) return null
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}