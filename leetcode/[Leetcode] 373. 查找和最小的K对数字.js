// 暴力求解(优先队列) - 超时
var kSmallestPairs = function(nums1, nums2, k) {
  const result = new SelfMaxPriorityQueue()
  for(let i of nums1) {
    for(let j of nums2) {
      result.push([i, j])
      if (result.size() > k) {
        result.pop()
      }
    }
  }
  return result.heap
}

// 优化
var kSmallestPairs = function(nums1, nums2, k) {
  const result = new SelfMaxPriorityQueue()
  for(let i of nums1) {
    for(let j of nums2) {
      // 当堆顶元素大于要进的元素时候才让它进，否则直接退出循环(因为是两个有序数组)
      const topSum = result.peak() ? result.peak()[0] + result.peak()[1] : 0
      if(result.size() < k || topSum > i+j) {
        result.push([i, j])
        if (result.size() > k) {
          result.pop()
        }
      } else {
        break
      }

    }
  }
  return result.heap
}

class SelfMaxPriorityQueue {
  constructor() {
    this.heap = []
  }
  push(val) {
    this.heap.push(val)
    this.shiftUp(this.size() - 1)
  }
  shiftUp(index) {
    while(index > 0) {
      let parentIndex = (index - 1) >> 1
      if (this.compare(index, parentIndex)) {
        this.swap(parentIndex, index)
        index = parentIndex
      } else {
        break
      }
    }
  }
  pop() {
    if (this.size() === 0) return null
    this.swap(0, this.size() - 1)
    let result = this.heap.pop()
    this.shiftDown(0)
    return result
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
  compare(a, b) {
    let left = this.heap[a] ? this.heap[a][0] + this.heap[a][1] : 0
    let right = this.heap[b] ? this.heap[b][0] + this.heap[b][1] : 0
    return left > right
  }
  peak() {
    if (this.size() === 0) return null
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
}