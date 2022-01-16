/**
 * 与面试17.09第k个数一致
 */

/**
 * 解答一：暴力解决
 * 将每一项x2 x3 x5，排序+去重
 */
 function sortAndUnique(arr) {
  const set = new Set()
  arr.forEach(i => set.add(i))
  return Array.from(set).sort((a, b) => a - b)
}

var getKthMagicNumber = function(k) {
  let arr = [1]
  let i = 0
  while(arr.length <= k) {
    arr.push(arr[i] * 2)
    arr.push(arr[i] * 3)
    arr.push(arr[i] * 5)
    arr = sortAndUnique(arr)
    i++
  }
  return arr[k-1]
};

/**
 * 解答二: 三指针dp
 * 3指针递增交叉相乘防止重复
 * 每次取最小值新增保证了升序
 */
function getKthMagicNumber (k) {
  let arr = [1]
  let p3 = 0
  let p5 = 0
  let p7 = 0
  let i = k
  while (i--) {
    let res3 = arr[p3] * 2
    let res5 = arr[p5] * 3
    let res7 = arr[p7] * 5
    let res = Math.min(res3, res5, res7) // 保证了递增排序
    if (res === res3) p3++
    if (res === res5) p5++
    if (res === res7) p7++
    arr.push(res)
  }

  return arr[k-1]
}


/**
 * 解答三: 最小堆 + 质因数剪枝
 */

var getKthMagicNumber = function(k) {
  const minHeap = new MinHeap()
  minHeap.push(1)
  while(--k) {
    let cur = minHeap.pop()
    if (cur % 5 === 0) {
      minHeap.push(cur * 5)
    } else if (cur % 3 === 0) {
      minHeap.push(cur * 5)
      minHeap.push(cur * 3)
    } else {
      minHeap.push(cur * 5)
      minHeap.push(cur * 3)
      minHeap.push(cur * 2)
    }
  }
  return minHeap.peak()
}