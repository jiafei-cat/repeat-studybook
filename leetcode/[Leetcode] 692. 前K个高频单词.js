var topKFrequent = function(words, k) {
  let map = {}
  let result = []
  let maxPriorityQueue = new SelfMaxPriorityQueue()
  for(let i of words) {
    if (!map[i]) map[i] = 0
    map[i] += 1
  }

  Object.keys(map).forEach(key => {
    maxPriorityQueue.push({str: key, nums: map[key]})
  })

  while(k--) {
    result.push(maxPriorityQueue.pop().str)
  }
  return result
}


class SelfMaxPriorityQueue {
  constructor() {
    this.heap = []
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
      if (this.heap[parentIndex] && this.compare(index, parentIndex)) {
        this.swap(parentIndex, index)
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
      console.log(this.heap[leftIndex] && this.compare(leftIndex, temp))
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
  // 比较器: 关键逻辑
  compare = (a, b) => {
    a = this.heap[a]
    b = this.heap[b]

    // 次数不相等的比较次数，次数多的向上移动
    if (Math.abs(a.nums - b.nums) !== 0) {
      return a.nums > b.nums
    }
    let i = 0

    while(i < a.str.length) {
      // ab前面相同，但是b比a短，不移动
      if (!b.str[i]) {
        return false
      }
      // ab前面相同，但是a比b短，a往上移动
      if (!a.str[i]) {
        return true
      }
      // 遍历到不相同字符阶段，a的字符code小于b的字符code向上移动
      if (a.str[i].charCodeAt() !== b.str[i].charCodeAt()) {
        return a.str[i].charCodeAt() < b.str[i].charCodeAt()
      }
      i++
    }
    // b的长度大于a, a向上移动
    return true
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