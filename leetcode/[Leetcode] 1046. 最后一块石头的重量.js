// 暴力 - 每次粉碎完后排序
var lastStoneWeight = function(stones) {
  let arr = stones.sort((a, b) => b - a)
  while(arr.length > 1) {
    let x = arr.shift()
    let y = arr.shift()
    let cha = Math.abs(y - x)
    arr.push(cha)

    arr = arr.sort((a, b) => b - a)
  }
  return arr[0]
}

// 利用优先队列
var lastStoneWeight = function(stones) {
  const maxHeap = new MaxPriorityQueue()
  stones.map(i => maxHeap.push(i))

  while(maxHeap.size() > 1) {
    let fist = maxHeap.pop() || 0
    let second = maxHeap.pop() || 0
    maxHeap.push(Math.abs(fist - second))
  }
  return maxHeap.peak()
}