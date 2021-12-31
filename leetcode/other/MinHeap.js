
// 适合解决TopK排序问题，只对部分进行排序，不需要全排序
class MinHeap {
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
    while (index > 0) {
      let parentIndex = (index - 1) >> 1
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        break
      }
    }
  }

  pop() {
    if (!this.size()) return
    this.swap(0, this.size() - 1)
    const result = this.heap.pop()

    this.shiftDown(0)
    return result
  }

  shiftDown(index) {
    while(index < this.size() - 1) {
      let temp = index
      let leftIndex = 2 * index + 1
      let rightIndex = 2 * index + 2
      if (this.heap[temp] > this.heap[leftIndex]) {
        temp = leftIndex
      }
      if (this.heap[temp] > this.heap[rightIndex]) {
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

export default MinHeap