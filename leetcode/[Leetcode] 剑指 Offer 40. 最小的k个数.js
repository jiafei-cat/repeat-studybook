// 原api暴力排序
var getLeastNumbers = function(arr, k) {
  return arr.sort((a, b) => a - b).slice(0, k)
}

// 使用最小堆排序
var getLeastNumbers = function(arr, k) {
  const minHeap = new MinHeap()
  let result = []
  for(let i = 0; i < arr.length; i++) {
    minHeap.push(arr[i])
  }

  while(k--) {
    result.push(minHeap.pop())
  }
  return result
}