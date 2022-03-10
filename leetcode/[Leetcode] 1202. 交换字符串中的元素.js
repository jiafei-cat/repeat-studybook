/**
 * 思路:
 * 多个字符联通可以说明可以互相交换，同一组联通的字符肯定可以安字符从小到大输出
 * 解题步骤:
 * 1. 遍历获取每个字符的联通关系
 * 2. 遍历将联通关系的字符串分组且排序
 * 3. 遍历字符串，根据下标联通关系从对应组中从小到大抽出来拼接
 */
var smallestStringWithSwaps = function(s, pairs) {
  const unionSet = new UnionSet(s.length)
  // 第一步: 获取字符串下标联通关系
  for(let i = 0; i < pairs.length; i++) {
    unionSet.merge(pairs[i][0], pairs[i][1])
  }

  // 第二步: 获取联通的字符组(加排序)
  const willSortArr = {}
  for(let i = 0; i < s.length; i++) {
    let curVal = unionSet.find(i)
    if (!willSortArr[curVal]) {
      willSortArr[curVal] = new MinHeap()
    }
    willSortArr[curVal].push(s[i]) // 将一个联通组的推入到堆中排序
    // willSortArr[curVal].sort((a, b) => a.charCodeAt() - b.charCodeAt()) // 超时，换成堆排序
  }

  let result = ''
  // 第三步: 重排
  for(let i = 0; i < s.length; i++) {
    // 根据字符串下标联通关系找到对应的字符组
    const targetArr = willSortArr[unionSet.find(i)]

    result += targetArr.pop() // 将字符组的元素推出
  }
  return result
};

class MinHeap {
  constructor() {
    this.heap = []
  }
  push(val) {
    this.heap.push(val)
    this.shiftUp(this.size() - 1)
  }
  pop() {
    if (this.size() === 0) return
    this.swap(0, this.size() - 1)
    let val = this.heap.pop()
    this.shiftDown(0)
    return val
  }
  shiftUp(index) {
    while(index > 0) {
      let parentIndex = (index - 1) >> 1
      if (this.compare(this.heap[index], this.heap[parentIndex])) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        break
      }
    }
  }
  shiftDown(index) {
    while(index < this.size()) {
      let temp = index
      let leftIndex = index * 2 + 1
      let rightIndex = index * 2 + 2

      if (this.heap[leftIndex] && this.compare(this.heap[leftIndex], this.heap[temp])) {
        temp = leftIndex
      }

      if (this.heap[rightIndex] && this.compare(this.heap[rightIndex], this.heap[temp])) {
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
    console.log(a, b)
    return a.charCodeAt() < b.charCodeAt()
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
  peak() {
    if (this.size() === 0) return
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}


class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, i) => i)
  }

  find(index) {
    let curVal = this.father[index]
    return this.father[index] = index === curVal ? index : this.find(curVal)
  }

  merge(a, b) {
    let curA = this.find(a)
    let curB = this.find(b)
    if (curA === curB) {
      return
    }
    this.father[curA] = curB
  }
}