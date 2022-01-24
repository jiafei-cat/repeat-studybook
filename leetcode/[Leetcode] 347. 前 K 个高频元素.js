// 利用最小堆排序
var topKFrequent = function(nums, k) {
  let minHeap = new MinHeap()
  let map = {}
  for(let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) map[nums[i]] = 0
    map[nums[i]] += 1
  }
  Object.keys(map).forEach((key, i) => {
    minHeap.push({ number: map[key], type: key })
    if (i >= k) {
      minHeap.pop()
    }
  })

  return minHeap.heap.map(i => i.type)
}
