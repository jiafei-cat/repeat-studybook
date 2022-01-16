/**
 *  最小堆排序 + map去重 (报栈溢出错误)
 */
var nthSuperUglyNumber = function(n, primes) {
  const minHeap = new MinHeap()
  let map = {}
  minHeap.push(1)
  while(--n) {
    let cur = minHeap.pop()
    for(let i = 0; i < primes.length; i++) {
      let count = cur * primes[i]
      if (!map[count]) {
        map[count] = 1
        minHeap.push(count)
      }
    }
  }
  return minHeap.peak()
}

/**
 * 三指针思路 dp
 */
var nthSuperUglyNumber = function(n, primes) {
  let map = [1]
  let p = primes.map(i => 0) // 存放多个指针
  let i = n
  while(--i) {
    let min = map[p[0]] * primes[0]
    // 每次多个指针和primes相乘，算出得到的最小值
    for(let i = 0; i < primes.length; ++i) {
      min = Math.min(primes[i] * map[p[i]], min)
    }

    // 给对应上结果的指针++
    for(let i = 0; i < primes.length; ++i) {
      if (min === primes[i] * map[p[i]]) p[i]++
    }
    map.push(min)
  }
  return map[n - 1]
}