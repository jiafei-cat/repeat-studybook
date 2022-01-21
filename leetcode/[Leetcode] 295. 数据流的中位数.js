/**
 * 思路: 利用大小堆维护左右两边的数
 */
var MedianFinder = function() {
  this.maxHeap = new Heap(Heap.maxComparator)
  this.minHeap = new Heap(Heap.minComparator)
}

MedianFinder.prototype.addNum = function(num) {
  if (this.minHeap.size === 0 || num > this.minHeap.peak()) {
    this.minHeap.push(num)
    if (this.maxHeap.size + 1 < this.minHeap.size) {
      this.maxHeap.push(this.minHeap.pop())
    }
  } else {
    this.maxHeap.push(num)
    if (this.maxHeap.size > this.minHeap.size) {
      this.minHeap.push(this.maxHeap.pop())
    }
  }
}

MedianFinder.prototype.findMedian = function() {
  if (this.minHeap.size > this.maxHeap.size) {
    return this.minHeap.peak()
  }
  return (this.minHeap.peak() + this.maxHeap.peak()) / 2
}


class Heap {
    constructor(comparator) {
        this.size = 0
        this.value = []
        this.comparator = comparator || Heap.minComparator
    }

    push(val) {
        this.value.push(val)
        this.size++
        this.bubbleUp()
    }

    peak() {
        return this.value[0] || null
    }

    pop() {
        const max = this.value[0]
        const end = this.value.pop()
        this.size--
        if (this.value.length) {
            this.value[0] = end
            this.bubbleDown()
        }
        return max
    }


    bubbleUp() {
        let index = this.value.length - 1
        let parent = Math.floor((index - 1) / 2)
        while (this.comparator(this.value[index], this.value[parent]) < 0) {
            this.swap(this.value, index, parent)
            index = parent
            parent = Math.floor((index - 1) / 2)
        }
    }


    bubbleDown() {
        let i = 0, length = this.value.length
        const arr = this.value
        let temp = arr[i]
        for (let j = 2 * i + 1 j < length j = 2 * j + 1) {
            temp = arr[i]
            if (j + 1 < length && this.comparator(arr[j + 1], arr[j]) < 0) {
                j++
            } 

            if(this.comparator(arr[j], arr[i]) < 0) {
                this.swap(arr, i, j)
                i = j
            }else {
                break
            }
        }
    }

    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}


Heap.minComparator = (a, b) => a - b

Heap.maxComparator = (a, b) => b - a

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