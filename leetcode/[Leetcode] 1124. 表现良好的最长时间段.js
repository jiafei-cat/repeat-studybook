/**
 * 思路：
 * 根据问题，劳累天数一定要大于不劳累的连续天数，才是表现良好时间，要求最长的表现良好的长度
 * 简化问题: 将劳累天数比作+1，不劳累天数比作-1，那么>0就是表现良好时间，最转为求时间段>0的最长连续子序列
 * 如何求最长>0的子序列，可以使用前缀和数组，这样就可以求任意范围的值，通过对比前缀和数组的值，获得最长大于0的起始位置和结束为止
 * 
 */
var longestWPI = function(hours) {
  // 步骤一: 将题目转化为求最长子序列之和大于0的问题
  const arr = hours.map(i => i > 8 ? 1 : -1)

  // 步骤二: 利用前缀和数组求任意区间之和大于0的
  // [1, 2, 3, 4]
  // [0, 1, 3, 6, 10] - 前缀和数组
  // 例如想求arr[1]+...arr[3]的和，等于prefixSumArr[4] - prefixSumArr[1]
  // Sum(arr[i~i+2]) = prefixSumArr[i+3] - prefixSumArr[i]
  let sum = 0
  const prefixSumArr = arr.reduce((pre, cur) => {
    sum += cur
    pre.push(sum)
    return pre
  }, [0])

  // 步骤三: 暴力求最长区间
  // 每每对比区间和长度，再与上次最大区间长度对比
  let result = 0 // 上次最大区间长度
  for (let i = 0; i < prefixSumArr.length; i++) {
    for (let j = i + 1; j < prefixSumArr.length; j++) {
      if (prefixSumArr[j] > prefixSumArr[i]) {
        result = Math.max(result, j - i)
      }
    }
  }
  return result
}

/**
 * 优化暴力求最长区间-1
 */
var longestWPI = function(hours) {
  const arr = hours.map(i => i > 8 ? 1 : -1)

  let sum = 0
  const prefixSumArr = arr.reduce((pre, cur) => {
    sum += cur
    pre.push(sum)
    return pre
  }, [0])

  let result = 0
  for (let i = 0; i < prefixSumArr.length; i++) {
    // 优化: 由递增获取最长区间改为假设最长然后递减找出最长区间(减少了二层遍历次数)
    // 如果 prefixSumArr[j+1] > prefixSumArr[i], 那么就可以不用遍历prefixSumArr[j]
    for (let j = prefixSumArr.length - 1; j > i; j--) {
      if (prefixSumArr[j] > prefixSumArr[i]) {
        result = Math.max(result, j - i)
        break // 这里已经找到满足最长区间的j和i值了, 无需再遍历
      }
    }
  }
  return result
}

/**
 * 优化暴力求最长区间-2
 * 如果prefixSumArr[i] <= prefixSumArr[i+1], i < i+1 < j，i+1 ~ j肯定不是最长区间，i~j才是
 * 所以这里需要利用单调栈找到严格递减的数组
 */
var longestWPI = function(hours) {
  const arr = hours.map(i => i > 8 ? 1 : -1)

  let sum = 0
  const prefixSumArr = arr.reduce((pre, cur) => {
    sum += cur
    pre.push(sum)
    return pre
  }, [0])

  const stack = [] // 单调栈
  for (let i = 0; i < prefixSumArr.length; i++) {
    // 栈顶元素大于当前元素就是递减(存储的是下标)
    if (!stack.length || prefixSumArr[stack[stack.length - 1]] > prefixSumArr[i]) {
      stack.push(i)
    }
  }

  // 有了单调栈，i(起始位置)的范围缩减了
  let result = 0
  for (let j = prefixSumArr.length - 1; j >= result; j--) {
    while(stack.length) {
      let i = stack[stack.length - 1]
      // 从最短区间判断是否满足良好表现时间，递增往上找最长区间
      if (prefixSumArr[j] > prefixSumArr[i]) {
        result = Math.max(result, j - i)
        stack.pop()
      } else {
        break // 往上查找不符合就没有必要再往上了
      }
    }
  }
  return result
}