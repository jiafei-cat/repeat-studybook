// 大顶堆 - 优先队列
class MaxPriorityQueue {
  constructor() {
    this.heap = []
  }
  peak() {
    if (!this.size()) return
    return this.heap[0]
  }

  push(node) {
    this.heap.push(node)
    this.shiftUp(this.size() - 1)
  }

  shiftUp(index) {
    while(index > 0) {
      let parentIndex = (index - 1) >> 1
      if (this.heap[parentIndex] < this.heap[index]) {
        this.swap(parentIndex, index)
        index = parentIndex
      } else {
        break
      }
    }
  }

  pop() {
    this.swap(0, this.size() - 1)
    const result = this.heap.pop()
    this.shiftDown(0)
    return result
  }

  shiftDown(index) {
    while(index < this.size() - 1) {
      let temp = index
      let leftIndex = index * 2 + 1
      let rightIndex = index * 2 + 2

      if (this.heap[leftIndex] > this.heap[temp]) {
        temp = leftIndex
      }

      if (this.heap[rightIndex] > this.heap[temp]) {
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
    return [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }

  size() {
    return this.heap.length
  }
}

export default MaxPriorityQueue
