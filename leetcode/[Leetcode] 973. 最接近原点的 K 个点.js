// 利用大顶堆求最小k值
var kClosest = function(points, k) {
  let maxHeap = new MaxHeap()
  for(let i = 0; i < points.length; i++) {
    let [a, b] = points[i]
    let kResult = Math.pow(Math.abs(a - 0), 2) + Math.pow(Math.abs(b - 0), 2) // 求当前点的欧几里德距离
    maxHeap.push({ arr: points[i], result: kResult })
    if (i >= k) {
      maxHeap.pop()
    }
  }
  let result = []
  while(result.length < k) {
    result.push(maxHeap.pop().arr)
  }

  return result
}
